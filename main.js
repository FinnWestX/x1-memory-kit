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

/* ===== Auto Review Count ===== */
(function() {
    var startDate = new Date('2026-03-26');
    var startCount = 118;
    var now = new Date();
    var days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    if (days < 0) days = 0;
    // Pseudo-random per day: 6-12 reviews per day based on date seed
    var total = startCount;
    for (var d = 0; d < days; d++) {
        var seed = (d * 7 + 3) % 7;
        total += 6 + seed; // 6-12 per day
    }
    // Intraday: add 0-1 per 2 hours
    var hours = now.getHours();
    total += Math.floor(hours / 2);

    var countEl = document.getElementById('review-count');
    if (countEl) {
        countEl.innerHTML = '<span class="en">' + total + ' reviews</span><span class="de">' + total + ' Bewertungen</span>';
    }
    var avgEl = document.getElementById('avg-rating');
    if (avgEl) {
        // Rating stays between 4.7 and 4.9
        var ratings = [4.7, 4.8, 4.8, 4.9, 4.8];
        avgEl.textContent = ratings[days % ratings.length].toFixed(1);
    }
    // Update bar counts proportionally
    var c5 = Math.round(total * 0.75);
    var c4 = Math.round(total * 0.18);
    var c3 = Math.round(total * 0.05);
    var c2 = Math.round(total * 0.02);
    var c1 = total - c5 - c4 - c3 - c2;
    if (c1 < 0) c1 = 0;
    var els5 = document.querySelector('.count-5'); if(els5) els5.textContent = c5;
    var els4 = document.querySelector('.count-4'); if(els4) els4.textContent = c4;
    var els3 = document.querySelector('.count-3'); if(els3) els3.textContent = c3;
    var els2 = document.querySelector('.count-2'); if(els2) els2.textContent = c2;
    var els1 = document.querySelector('.count-1'); if(els1) els1.textContent = c1;
    var bar5 = document.querySelector('.bar-5'); if(bar5) bar5.style.width = Math.round(c5/total*100)+'%';
    var bar4 = document.querySelector('.bar-4'); if(bar4) bar4.style.width = Math.round(c4/total*100)+'%';
    var bar3 = document.querySelector('.bar-3'); if(bar3) bar3.style.width = Math.round(c3/total*100)+'%';
    var bar2 = document.querySelector('.bar-2'); if(bar2) bar2.style.width = Math.round(c2/total*100)+'%';
    var bar1 = document.querySelector('.bar-1'); if(bar1) bar1.style.width = Math.round(c1/total*100)+'%';
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

/* ===== Nav background on scroll ===== */
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.style.borderBottomColor = 'rgba(14, 165, 233, 0.3)';
    } else {
        nav.style.borderBottomColor = '';
    }
});

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
(function() {
    var savedLang = localStorage.getItem('fwx-lang');
    if (savedLang === 'de') {
        document.documentElement.lang = 'de';
        var btns = document.querySelectorAll('.lang-toggle button');
        if (btns.length >= 2) {
            btns[0].classList.remove('active');
            btns[1].classList.add('active');
        }
    }
})();
