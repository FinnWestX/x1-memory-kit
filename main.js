/* ===== Star Rating Selector ===== */
(function() {
    var starSelect = document.getElementById('star-select');
    var ratingInput = document.getElementById('review-rating');
    if (starSelect && ratingInput) {
        var stars = starSelect.querySelectorAll('[data-star]');
        stars.forEach(function(star) {
            star.addEventListener('click', function() {
                var val = parseInt(this.getAttribute('data-star'));
                ratingInput.value = val;
                stars.forEach(function(s) {
                    s.style.color = parseInt(s.getAttribute('data-star')) <= val ? '#f59e0b' : '#333';
                });
            });
            star.addEventListener('mouseenter', function() {
                var val = parseInt(this.getAttribute('data-star'));
                stars.forEach(function(s) {
                    s.style.color = parseInt(s.getAttribute('data-star')) <= val ? '#f59e0b' : '#333';
                });
            });
        });
        starSelect.addEventListener('mouseleave', function() {
            var val = parseInt(ratingInput.value);
            stars.forEach(function(s) {
                s.style.color = parseInt(s.getAttribute('data-star')) <= val ? '#f59e0b' : '#333';
            });
        });
    }

    var form = document.getElementById('review-form');
    var msg = document.getElementById('review-msg');
    var WEBHOOK_URL = 'https://webhook.finnwestx1.com';

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (parseInt(ratingInput.value) === 0) {
                msg.textContent = 'Please select a rating / Bitte Sterne auswaehlen';
                msg.style.display = 'block';
                msg.style.color = '#ef4444';
                return;
            }

            var orderNum = document.getElementById('review-order').value.trim();
            var reviewName = document.getElementById('review-name').value.trim();
            var reviewProduct = document.getElementById('review-product').value;
            var reviewText = document.getElementById('review-text').value.trim();
            var reviewRating = parseInt(ratingInput.value);

            msg.textContent = 'Verifying order... / Bestellung wird geprueft...';
            msg.style.display = 'block';
            msg.style.color = '#0ea5e9';

            fetch(WEBHOOK_URL + '/submit-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: orderNum,
                    name: reviewName,
                    product: reviewProduct,
                    rating: reviewRating,
                    text: reviewText
                })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) {
                    msg.textContent = 'Thank you! Your review has been submitted and will be published shortly. / Danke! Deine Bewertung wurde eingereicht und wird in Kuerze veroeffentlicht.';
                    msg.style.color = '#22c55e';
                    form.reset();
                    ratingInput.value = 0;
                    starSelect.querySelectorAll('[data-star]').forEach(function(s) { s.style.color = '#333'; });
                } else if (data.error === 'not_verified') {
                    msg.textContent = 'Order not verified. Only verified buyers can leave a review. Please purchase first. / Bestellung nicht verifiziert. Nur verifizierte Kaeufer koennen eine Bewertung abgeben. Bitte zuerst kaufen.';
                    msg.style.color = '#ef4444';
                } else {
                    msg.textContent = data.message || 'Error / Fehler';
                    msg.style.color = '#ef4444';
                }
            })
            .catch(function(err) {
                msg.textContent = 'Connection error. Please try again. / Verbindungsfehler. Bitte erneut versuchen.';
                msg.style.color = '#ef4444';
            });
        });
    }
})();

/* ===== Newsletter ===== */
(function() {
    var form = document.getElementById('newsletter-form');
    var msg = document.getElementById('newsletter-msg');
    var WEBHOOK_URL = 'https://webhook.finnwestx1.com';

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('newsletter-email').value.trim();
            if (!email) return;

            msg.textContent = 'Subscribing... / Wird angemeldet...';
            msg.style.display = 'block';
            msg.style.color = '#0ea5e9';

            fetch(WEBHOOK_URL + '/newsletter-subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) {
                    msg.textContent = 'Check your email for confirmation + your 5% discount code! / Prüfe deine E-Mail für die Bestätigung + deinen 5% Rabattcode!';
                    msg.style.color = '#22c55e';
                    form.reset();
                } else {
                    msg.textContent = data.message || 'Error';
                    msg.style.color = '#ef4444';
                }
            })
            .catch(function() {
                msg.textContent = 'Connection error. Please try again. / Verbindungsfehler.';
                msg.style.color = '#ef4444';
            });
        });
    }
})();

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

/* ===== Nav transparency on scroll ===== */
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.22)';
        nav.style.borderBottomColor = 'rgba(14, 165, 233, 0.2)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.85)';
        nav.style.borderBottomColor = '';
    }
});

/* ===== Umami Scroll Depth Tracking ===== */
(function() {
    var scrollMarks = {25: false, 50: false, 75: false, 100: false};
    window.addEventListener('scroll', function() {
        var scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        [25, 50, 75, 100].forEach(function(mark) {
            if (scrollPct >= mark && !scrollMarks[mark]) {
                scrollMarks[mark] = true;
                if (typeof umami !== 'undefined') {
                    umami.track('scroll-depth-' + mark);
                }
            }
        });
    });
})();

/* ===== Language Toggle ===== */
function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle button').forEach(function(b) {
        b.classList.remove('active');
    });
    if (lang === 'de') {
        document.querySelectorAll('.lang-toggle button')[1].classList.add('active');
    } else {
        document.querySelectorAll('.lang-toggle button')[0].classList.add('active');
    }
    localStorage.setItem('fwx-lang', lang);
}

// Restore language preference on load
// Priority: ?lang=de URL parameter > browser language (if German) > localStorage > default English
(function() {
    var urlLang = new URLSearchParams(location.search).get('lang');
    var savedLang = localStorage.getItem('fwx-lang');
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var useGerman = false;

    if (urlLang === 'de') {
        useGerman = true;
        localStorage.setItem('fwx-lang', 'de');
    } else if (urlLang === 'en') {
        useGerman = false;
        localStorage.setItem('fwx-lang', 'en');
    } else if (savedLang === 'de') {
        useGerman = true;
    } else if (!savedLang && browserLang.indexOf('de') === 0) {
        // First visit from a German browser - default to German
        useGerman = true;
    }

    if (useGerman) {
        document.documentElement.lang = 'de';
        var btns = document.querySelectorAll('.lang-toggle button');
        if (btns.length >= 2) {
            btns[0].classList.remove('active');
            btns[1].classList.add('active');
        }
    }
})();
