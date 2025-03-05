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
