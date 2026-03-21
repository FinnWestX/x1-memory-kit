/* ===== FAQ Accordion ===== */
document.querySelectorAll('.faq-question').forEach(function(button) {
    button.addEventListener('click', function() {
        var item = this.parentElement;
        var isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(function(i) {
            i.classList.remove('active');
        });

        // Open clicked (if it wasn't already open)
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* ===== Consent Checkbox → Enable Button ===== */
var checkbox = document.getElementById('consent-checkbox');
var checkoutBtn = document.getElementById('checkout-btn');

if (checkbox && checkoutBtn) {
    checkbox.addEventListener('change', function() {
        checkoutBtn.disabled = !this.checked;
    });
}

/* ===== Stripe Checkout ===== */
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (!checkbox.checked) return;

        // Redirect to Stripe Checkout (test mode)
        // In production, this would create a Checkout Session via your backend.
        // For the test/demo deployment, we show a message.

        checkoutBtn.textContent = 'Redirecting to Stripe...';
        checkoutBtn.disabled = true;

        // Create Stripe Checkout session via inline fetch
        // NOTE: In production, NEVER expose the secret key client-side.
        // This is TEST MODE only for demonstration.
        fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer STRIPE_SECRET_KEY_PLACEHOLDER',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'mode': 'payment',
                'line_items[0][price_data][currency]': 'eur',
                'line_items[0][price_data][product_data][name]': 'X1 Memory Kit for OpenClaw',
                'line_items[0][price_data][product_data][description]': '9 MD config files, scripts, guides. One-time purchase.',
                'line_items[0][price_data][unit_amount]': '4700',
                'line_items[0][quantity]': '1',
                'success_url': window.location.origin + '/success.html',
                'cancel_url': window.location.origin + '/#pricing'
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(session) {
            if (session.url) {
                window.location.href = session.url;
            } else {
                alert('Stripe test checkout: ' + (session.error ? session.error.message : 'Session created. In production, you would be redirected to pay.'));
                checkoutBtn.textContent = 'Buy Now — €47';
                checkoutBtn.disabled = false;
                checkbox.checked = true;
            }
        })
        .catch(function(err) {
            console.error('Stripe error:', err);
            alert('Could not connect to Stripe. Please try again.');
            checkoutBtn.textContent = 'Buy Now — €47';
            checkoutBtn.disabled = false;
            checkbox.checked = true;
        });
    });
}

/* ===== Smooth scroll for nav links ===== */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===== Contact Form Submit via hidden iframe ===== */
(function() {
    var form = document.getElementById('contact-form');
    var iframe = document.getElementById('hidden-form-iframe');
    var submitBtn = document.getElementById('contact-submit-btn');

    if (!form || !iframe || !submitBtn) return;

    form.addEventListener('submit', function(e) {
        // The form submits natively into the hidden iframe (target="hidden-form-iframe").
        // We just update the button text and listen for the iframe load event.
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    });

    iframe.addEventListener('load', function() {
        // The iframe fires 'load' on initial page load (empty) and after form submission.
        // We only want to react after a form submission, so check if the button says "Sending...".
        if (submitBtn.textContent === 'Sending...') {
            form.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            alert('Message sent successfully! We will get back to you soon.');
        }
    });
})();

/* ===== Nav background on scroll ===== */
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.style.borderBottomColor = 'rgba(108, 92, 231, 0.3)';
    } else {
        nav.style.borderBottomColor = '';
    }
});
