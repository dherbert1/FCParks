function heightCard() {
    let slides = document.querySelectorAll(".photos__slider-item img");
    let maxHeight = 0;
    let loadedCount = 0;
  
    slides.forEach(function (img) {
      if (img.complete) {
        checkHeight(img);
      } else {
        img.onload = () => checkHeight(img);
      }
    });
  
    function checkHeight(img) {
      const parent = img.closest('.photos__slider-item');
      if (parent) {
        const height = parent.offsetHeight;
        if (height > maxHeight) maxHeight = height;
  
        loadedCount++;
        if (loadedCount === slides.length) {
          document.querySelectorAll(".photos__slider-item").forEach(slide => {
            slide.style.height = `${maxHeight}px`;
          });
        }
      }
    }
  }
  