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
let elem = document.querySelector('.photos__slider');
function handlePhotos() {
  let flkty = new Flickity(elem, {
    wrapAround: true,
    autoplay: 5,
    fullscreen: true,
    pageDots: false,
    prevNextButtons: true,
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
