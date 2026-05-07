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

/* ================= Active Nav Link (Throttled) ================= */
let navTicking = false;
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
window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(() => {
            updateNavActive();
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });
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
