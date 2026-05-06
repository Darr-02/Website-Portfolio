// ── Typewriter ──
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (!hash || hash === "#home") return;

    if (window.__skipHomeReset) return;

    setTimeout(() => {
        window.location.hash = "#home";
    }, 50);
});

const text = "IoT Student!";
const x = document.getElementById("typewriter");
const speed = 150;
const wait = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter() {
    while (true) {
        for (let i = 0; i < text.length; i++) {
            x.innerText = text.substring(0, i + 1);
            await sleep(speed);
        }
        await sleep(wait);
        for (let i = text.length; i > 0; i--) {
            x.innerText = text.substring(0, i - 1);
            await sleep(speed);
        }
        await sleep(wait);
    }
}

// ── Skill tabs ──
function showContent(tabName) {
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.section').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

window.onload = function() {
    typeWriter();
};

// ── Navbar hamburger ──
const navMenu = document.querySelector('nav ul');
const menuBtn = document.getElementById("menu");

menuBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.addEventListener("click", function(event) {
    if (!navMenu.contains(event.target) && event.target !== menuBtn) {
        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        document.body.classList.remove("menu-open");
    }
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        // When user clicks an anchor, do not force back to #home on load.
        window.__skipHomeReset = true;

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        document.body.classList.remove("menu-open");

        // Allow next real refresh to apply the reset again.
        setTimeout(() => {
            window.__skipHomeReset = false;
        }, 300);
    });
});

// ── Active navbar highlight on scroll ──
let sections = document.querySelectorAll('section, main');
let navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let scrollMiddle = window.scrollY + window.innerHeight / 2;
    let currentId = "";

    [...sections].reverse().forEach(sec => {
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (scrollMiddle >= offset && scrollMiddle < offset + height) {
            currentId = id;
        }
    });

    if (currentId === "") {
        currentId = "home";
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
});

// ── Swiper ──
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
loop: false,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        1024: {
            cssMode: true,
            grabCursor: false,
        }
    }
});

// ── ID Card 3D tilt ──
const card = document.querySelector('.id-card');
const container = document.querySelector('.image');

if (card && container) {
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 18;
        const rotateY = (rect.width / 2 - x) / 18;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.5s ease';
    });

    container.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
}

document.querySelector(".credit span").textContent = new Date().getFullYear();