const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const VERCEL_CLI_CLIENT_ID = 'cl_HYyOPBNtFMfHhaUn9L4QPfTZz6TP47bp';
const PROJECT_NAME = 'x1-memory-kit';
const FILES_TO_DEPLOY = [
    'index.html', 'style.css', 'main.js',
    'impressum.html', 'datenschutz.html', 'widerruf.html',
    'agb.html', 'success.html'
];

function fetch(url, options) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const reqOpts = {
            hostname: u.hostname,
            path: u.pathname + u.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };
        const req = https.request(reqOpts, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, json: () => JSON.parse(data), text: () => data });
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getDiscovery() {
    const res = await fetch('https://vercel.com/.well-known/openid-configuration', {
        headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
}

async function startDeviceFlow(discovery) {
    const res = await fetch(discovery.device_authorization_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'client_id=' + VERCEL_CLI_CLIENT_ID + '&scope=openid+offline_access'
    });
    return res.json();
}

async function pollForToken(discovery, deviceCode, interval) {
    while (true) {
        await sleep(interval * 1000);
        const res = await fetch(discovery.token_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'client_id=' + VERCEL_CLI_CLIENT_ID +
                  '&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code' +
                  '&device_code=' + encodeURIComponent(deviceCode)
        });
        const json = res.json();
        if (json.access_token) return json.access_token;
        if (json.error === 'authorization_pending') {
            process.stdout.write('.');
            continue;
        }
        if (json.error === 'slow_down') {
            interval += 1;
            continue;
        }
        if (json.error === 'expired_token') {
            throw new Error('Device code expired. Please try again.');
        }
        throw new Error('OAuth error: ' + JSON.stringify(json));
    }
}

async function deployToVercel(token) {
    console.log('\nPreparing deployment...');

    // Get user info to find team
    const userRes = await fetch('https://api.vercel.com/v2/user', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const userData = userRes.json();
    const teamId = userData.user.defaultTeamId;
    console.log('Deploying as: ' + userData.user.username + (teamId ? ' (team: ' + teamId + ')' : ''));

    // Build inline files
    const files = FILES_TO_DEPLOY.map(name => {
        const content = fs.readFileSync(path.join(__dirname, name));
        return { file: name, data: content.toString('base64'), encoding: 'base64' };
    });
    console.log('Files: ' + files.length);

    // Create deployment
    const teamParam = teamId ? '?teamId=' + teamId : '';
    const body = JSON.stringify({
        name: PROJECT_NAME,
        files: files,
        projectSettings: { framework: null },
        target: 'production'
    });

    const deployRes = await fetch('https://api.vercel.com/v13/deployments' + teamParam, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: body
    });

    const result = deployRes.json();
    if (deployRes.ok) {
        console.log('\n========================================');
        console.log('  DEPLOYMENT SUCCESSFUL');
        console.log('========================================');
        console.log('URL: https://' + result.url);
        if (result.alias && result.alias.length > 0) {
            result.alias.forEach(a => console.log('Alias: https://' + a));
        }
        console.log('State: ' + result.readyState);
        console.log('ID: ' + result.id);
        console.log('========================================\n');

        // Save token for future use
        const authDir = path.join(os.homedir(), '.local/share/com.vercel.cli');
        fs.mkdirSync(authDir, { recursive: true });
        fs.writeFileSync(path.join(authDir, 'auth.json'), JSON.stringify({
            '// Note': 'This is your Vercel credentials file. DO NOT SHARE!',
            token: token
        }, null, 2));
        console.log('Token saved to ' + path.join(authDir, 'auth.json'));
    } else {
        console.log('\nDeployment failed:');
        console.log('Status: ' + deployRes.status);
        console.log(JSON.stringify(result, null, 2));
    }
}

async function main() {
    // Check if token is provided as argument
    if (process.argv[2]) {
        console.log('Using provided token...');
        return deployToVercel(process.argv[2]);
    }

    // Check if token exists in auth file
    const authFile = path.join(os.homedir(), '.local/share/com.vercel.cli/auth.json');
    try {
        const auth = JSON.parse(fs.readFileSync(authFile, 'utf8'));
        if (auth.token) {
            console.log('Using saved token...');
            return deployToVercel(auth.token);
        }
    } catch (e) {}

    // Start OAuth device flow
    console.log('=== Vercel OAuth Device Flow ===\n');
    console.log('Step 1: Getting discovery config...');
    const discovery = await getDiscovery();

    console.log('Step 2: Starting device authorization...');
    const device = await startDeviceFlow(discovery);

    console.log('\n=============================================');
    console.log('  OPEN THIS URL IN YOUR BROWSER:');
    console.log('  ' + device.verification_uri_complete);
    console.log('');
    console.log('  Or visit: ' + device.verification_uri);
    console.log('  And enter code: ' + device.user_code);
    console.log('=============================================\n');
    console.log('Waiting for you to authorize');

    const token = await pollForToken(discovery, device.device_code, device.interval || 5);
    console.log('\nAuthorization successful!');

    await deployToVercel(token);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
