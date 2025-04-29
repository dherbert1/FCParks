// === Initial Loading Animation ===
function initialLoading() {
  const container = document.querySelector(".homepage");
  const loading = document.querySelector(".loading");
  const images = container?.querySelectorAll("img") || [];
  const imgLoad = imagesLoaded(container);
  let loadedCount = 0;

  imgLoad
    .on("progress", () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / images.length) * 100);
      updateLoadingBar(percent);
    })
    .on("fail", (instance) => {
      console.warn("⚠️ Some images failed to load. This may be expected.");
      instance.images.forEach((img) => {
        if (!img.isLoaded) {
          console.warn("❌ Failed image:", img.img?.src);
        }
      });
    })
    .on("done", () => {
      console.log("✅ All visible images loaded.");
    })
    .on("always", () => {
      console.log("✅ Image loading process finished.");
      loading?.classList.toggle("--loaded");
      container?.classList.remove("--disable-scroll");
    });
}

function updateLoadingBar(percent) {
  const progress = document.querySelector(".loading-bar");
  const percentText = document.querySelector(".loading__inner-per");
  if (progress && percentText) {
    progress.style.width = `${percent}%`;
    percentText.innerHTML = `${percent}%`;
  }
}

// === Scroll To Top Button ===
function setupScrollToTop() {
  const backToTop = document.getElementById("btnup");
  if (!backToTop) return;

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function toggleButtonVisibility() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const halfway = (docHeight - winHeight) / 2;
    backToTop.style.display = scrollY > halfway ? "block" : "none";
  }

  window.addEventListener("scroll", toggleButtonVisibility);
  toggleButtonVisibility(); // Initial check
}

// === Lazy Loaded Photo Slider ===
function initPhotoSlider() {
  const elem = document.querySelector(".photos__slider");
  if (!elem) return;

  const flkty = new Flickity(elem, {
    wrapAround: true,
    autoplay: 5,
    fullscreen: true,
    pageDots: false,
    prevNextButtons: true,
    lazyLoad: 2,
    adaptiveHeight: true,
  });

  // Adjust height when Flickity is ready
  flkty.on("ready", () => {
    setTimeout(adjustSlideHeights, 100);
  });

  // Adjust when lazy images load
  flkty.on("lazyLoad", () => {
    flkty.resize();
    adjustSlideHeights();
  });
}

function adjustSlideHeights() {
  setTimeout(() => {
    const slides = document.querySelectorAll(".photos__slider-item");
    let maxHeight = 0;
    slides.forEach((slide) => {
      slide.style.height = "auto"; // Reset height first
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });
    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });
  }, 50); // Small delay for layout to settle
}

// === Mobile Menu Toggle ===
function setupMobileMenu() {
  const btnMenu = document.querySelector(".header__cta-hamburger .bars");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  if (!btnMenu || !nav || !header) return;

  btnMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    header.classList.toggle("active");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      btnMenu.classList.remove("active");
      nav.classList.remove("active");
      header.classList.remove("active");
    }
  });
}

// === FAQ Accordion ===
function setupAccordions() {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

// === Initialize Everything ===
window.addEventListener("load", () => {
  const slider = document.querySelector(".photos__slider");

  if (slider) {
    imagesLoaded(slider, () => {
      initPhotoSlider(); // Only init Flickity when ready
    });
  }

  initialLoading();
  setupScrollToTop();
  setupAccordions();
  setupMobileMenu();
});

// === Resize Handling for Slider Height ===
window.addEventListener("resize", adjustSlideHeights);

//FOR RATESPAGE JS
const ratesPage = () => {
  const ddcontainer = document.getElementsByClassName("dd_container");
  const ratesdd = document.getElementsByClassName("rates_dd");
  const drop1 = document.getElementById("dropDown1");
  const drop2 = document.getElementById("dropDown2");
};