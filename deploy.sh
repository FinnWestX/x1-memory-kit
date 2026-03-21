#!/bin/bash
# Deploy X1 Memory Kit landing page to Vercel
#
# Usage:
#   ./deploy.sh                  (interactive login via browser)
#   ./deploy.sh YOUR_TOKEN       (direct deploy with token)
#
# To get a token: https://vercel.com/account/tokens -> Create Token

cd "$(dirname "$0")"

echo "=== X1 Memory Kit — Vercel Deploy ==="
echo ""

# Method 1: Token as argument
if [ -n "$1" ]; then
    echo "Deploying with provided token..."
    node deploy.js "$1"
    exit $?
fi

# Method 2: npx vercel (handles login + deploy)
echo "Starting Vercel CLI deploy..."
echo "A browser window will open for authentication."
echo "Log in to your Vercel account and authorize the CLI."
echo ""

npx vercel deploy --yes --prod 2>&1
