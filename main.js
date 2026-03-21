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

/* ===== Stripe Payment Link Checkout ===== */
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (!checkbox.checked) return;
        // Redirect to Stripe Payment Link (LIVE)
        window.location.href = 'https://buy.stripe.com/dRm7sFaVUaJu6w56MU2Nq00';
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

/* ===== Contact mailto: link — no backend, no tracking ===== */

/* ===== Nav background on scroll ===== */
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.style.borderBottomColor = 'rgba(108, 92, 231, 0.3)';
    } else {
        nav.style.borderBottomColor = '';
    }
});
