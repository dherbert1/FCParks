let slideIndex = 1;
      showSlides(slideIndex);

      function plusSlides(n) {
        showSlides(slideIndex += n);
      }

      function currentSlide(n) {
        showSlides(slideIndex = n);
      }

      function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
      }



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

// Reviews
function handleReviews() {
  let flkty = new Flickity(".reviews__slider", {
    groupCells: 2,
    wrapAround: true,
    pageDots: true,
    prevNextButtons: true,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          groupCells: 1,
        },
      },
    ],
    on: [ 
      {
        ready: function () {
          heightCard();
        },
      }
    ],
  });
};

function handleServices() {
  let flkty = new Flickity(".services__slider", {
    groupCells: 2,
    wrapAround: true,
    pageDots: true,
    prevNextButtons: true,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          groupCells: 1,
        },
      },
    ],
    on: [ 
      {
        ready: function () {
          heightCard();
        },
      }
    ],
  });
};

function heightCard() {
  let slides = document.querySelectorAll(".reviews__slider-item .textbody.--bd1");
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
  handleReviews();
  handleServices();
});
window.addEventListener("resize", function () {
  handleReviews();
  handleServices();
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