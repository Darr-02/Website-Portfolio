/* ═══════════════════════════════════════════════════════
   Portfolio JS — Darrick Aaron Untarman
═══════════════════════════════════════════════════════ */

// ── Footer year ──────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll state ──────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ── Active nav link on scroll ────────────────────────
const sections = document.querySelectorAll('main[id], section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    let currentId = '';

    sections.forEach(sec => {
        if (scrollMid >= sec.offsetTop && scrollMid < sec.offsetTop + sec.offsetHeight) {
            currentId = sec.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ── Hamburger menu ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksList.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (!navLinksList.contains(e.target) && e.target !== hamburger) {
        hamburger.classList.remove('open');
        navLinksList.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ── Scroll animations ────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.section-header, .about-grid, .expertise-category, ' +
    '.project-feature, .project-alt, .project-card, ' +
    '.timeline-item, .cert-item, .contact-inner, .hero-inner'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger within the same parent
            const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('fade-up'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
