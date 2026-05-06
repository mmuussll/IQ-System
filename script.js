/* ================= Mobile Detection ================= */
const isMobile = window.innerWidth <= 768;

/* ================= Header Scroll ================= */
const header = document.getElementById('header');
let ticking = false;
if (header) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ================= Mobile Nav Toggle ================= */
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
    navToggle.addEventListener('click', () => navList.classList.toggle('active'));
    navList.querySelectorAll('.nav__link').forEach(link =>
        link.addEventListener('click', () => navList.classList.remove('active'))
    );
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !navToggle.contains(e.target))
            navList.classList.remove('active');
    });
}

/* ================= Active Nav Link ================= */
function updateNavActive() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';

    sections.forEach(s => {
        const top = s.offsetTop - 120;
        if (scrollY >= top && scrollY < top + s.offsetHeight)
            current = s.getAttribute('id');
    });

    document.querySelectorAll('.nav__link').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + current)
    );
    document.querySelectorAll('.mobile-nav__item a').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + current)
    );
}
window.addEventListener('scroll', updateNavActive, { passive: true });
updateNavActive();

/* ================= Smooth Scroll (fast) ================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ================= Scroll Reveal (lightweight) ================= */
const revealEls = document.querySelectorAll('.about__card, .product__card, .feature__item');
revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ================= Parallax Glow (Desktop Only) ================= */
if (!isMobile) {
    const g1 = document.querySelector('.hero__glow--1');
    const g2 = document.querySelector('.hero__glow--2');
    let glowTicking = false;

    if (g1 && g2) {
        document.addEventListener('mousemove', (e) => {
            if (!glowTicking) {
                requestAnimationFrame(() => {
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;
                    g1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                    g2.style.transform = `translate(${-x * 15}px, ${-y * 15}px)`;
                    glowTicking = false;
                });
                glowTicking = true;
            }
        }, { passive: true });
    }
}

/* ================= Service Worker Registration ================= */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then((reg) => console.log('SW registered:', reg.scope))
            .catch(() => { /* Non-critical, fail silently */ });
    });
}
