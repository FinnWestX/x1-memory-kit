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
