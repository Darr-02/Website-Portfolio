// For typing and delete typing
const text ="IoT Student!";
const x = document.getElementById("typewriter")
const speed = 150;
const wait = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter() {
    while(true){
    for(let i = 0; i<text.length;i++){
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

// For tab(skill section)
function showContent(tabName){
  document.querySelectorAll('.tab').forEach(function(tab){ tab.classList.remove('active')});

  document.querySelectorAll('.section').forEach(content => content.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

window.onload = function() {
  typeWriter();
};

// For navbar extra
const nav = document.querySelector('ul');
const menu = document.getElementById("menu");
menu.addEventListener('click', function(event){
  event.stopPropagation();
  menu.classList.toggle('active');
  nav.classList.toggle('active');
});

document.addEventListener("click", function(event) {
  if (!nav.contains(event.target) && event.target !== menu) {
    nav.classList.remove("active");  
    menu.classList.remove("active");  
  }
});

//active navbar border
let sections = document.querySelectorAll('section');
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

const swiper = new Swiper('.swiper', {
  cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
});

