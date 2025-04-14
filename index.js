// Scroll to top
function scrollToTop() {
  const backToTop = document.getElementById("btnup");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
scrollToTop();

// Hide when scroll to top
window.addEventListener("load", function () {
  function showScrollToTop() {
    const backToTop = document.getElementById("btnup");
    let scrollY = window.scrollY;
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;

    // Calculate half the height of the page
    let halfPage = (documentHeight - windowHeight) / 2;

    if (backToTop) {
      if (scrollY > halfPage) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    }
  }
  // Call once to set the initial state when the page loads
  showScrollToTop();

  // Add scroll event listener
  window.addEventListener("scroll", showScrollToTop);
});

// Photos (with Lazy Loading)
let elem = document.querySelector('.photos__slider');
function handlePhotos() {
  let flkty = new Flickity(elem, {
    wrapAround: true,
    autoplay: 5,
    fullscreen: true,
    pageDots: false,
    prevNextButtons: true,
    lazyLoad: true,
    adaptiveHeight: true,
    on: [ 
      {
        ready: function () {
          heightCard();
        },
      }
    ],
  });

  // Lazy load images in the carousel
  const images = document.querySelectorAll('.photos__slider-item img[data-src]');
  const loadImage = (img) => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
  };

  const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    images.forEach(image => {
      imageObserver.observe(image);
    });
  };

  lazyLoadImages(); // Initialize lazy loading for images
};

function heightCard() {
  let slides = document.querySelectorAll(".photos__slider-item");
  let maxHeight = 0;
  slides.forEach(function (slide) {
    let height = slide.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  slides.forEach(function (slide) {
    slide.style.height = `${maxHeight}px`;
  });
}
window.addEventListener("load", function () {
  handlePhotos();
});
window.addEventListener("resize", function () {
  handlePhotos();
});

// Click Hamburger, Show Menu
const btnMenu = document.querySelector(".header__cta-hamburger .bars"),
  nav = document.querySelector(".nav");
header = document.querySelector(".header");
function menuMobileHandle() {
  btnMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    header.classList.toggle("active");
  });
  function hideNav() {
    btnMenu.classList.remove("active");
    nav.classList.remove("active");
    header.classList.toggle("active");
  }
  window.addEventListener("resize", function () {
    let wWindow = window.innerWidth;
    if (wWindow > 991.98) {
      hideNav();
    }
  });
}
menuMobileHandle();

// FAQ
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// For rates page
function ratesDropDown(){
  const ddContainer = document.querySelectorAll('.dd_container');
  const dropDown = document.querySelectorAll('.dropdown');
  const shelterRent = document.querySelector('#shelterrent')
}