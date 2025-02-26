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
function handlePhotos() {
  let flkty = new Flickity(".photos__slider", {
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

// Scroll, Header Change Background
function headerColorChange() {
  const header = document.querySelector(".header");
  const headerHeight = 100;

  window.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  });
}

headerColorChange();

// Initial Loading
function initalLoading() {
  let loadedCount = 0,
    images = document.querySelectorAll("img").length;
  (container = document.querySelector(".homepage")), (imgLoad = imagesLoaded(container)), (loading = document.querySelector(".loading"));

  imgLoad
    .on("progress", function (instance) {
      loadedCount++;
      percent = Math.floor((loadedCount / images) * 100);
      percentLoading(percent);
      console.log(loadedCount);
    })
    .on("fail", function (instance) {
      console.log("Fail");
    })
    .on("done", function (instance) {
      console.log("Done");
    })
    .on("always", function (instance) {
      console.log("Always");
      loading.classList.toggle("--loaded");
      container.classList.remove("--disable-scroll");
    });
}

initalLoading();

function percentLoading(percent) {
  let progress = document.querySelector(".loading-bar"),
    percentNumber = document.querySelector(".loading__inner-per");

  progress.style.width = `${percent}%`;
  percentNumber.innerHTML = `${percent}%`;
}


// // Validate Form
// function validateForm() {
//   let form = document.querySelector(".getintouch__content-form"),
//     fullname = document.querySelector("#fullname"),
//     email = document.querySelector("#email"),
//     company = document.querySelector("#company"),
//     subject = document.querySelector("#subject"),
//     message = document.querySelector("#message");

//   if (!form) {
//     console.log("Form not found");
//     return;
//   }

//   function getParentInput(e, selector = "") {
//     // Condition has to be met to run
//     while (e.parentElement) {
//       if (e.parentElement.matches(selector)) {
//         return e.parentElement;
//       }
//       // let e = its parent and run again
//       e = e.parentElement;
//     }
//   }

//   // Show error
//   function showError(input, texterror = "") {
//     const parentInput = getParentInput(input, ".form-group");
//     let error = parentInput.querySelector(".error");
//     if (texterror != "") {
//       error.innerText = texterror;
//       input.classList.add("--error");
//     } else {
//       error.innerText = texterror;
//       input.classList.remove("--error");
//     }
//   }

//   // Validate full name
//   function isValidFullname(fullname) {
//     let regName = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
//     let adjustedFullname = fullname.trim().replace(/\s+/g, " ");
//     return regName.test(adjustedFullname);
//   }

//   // Validate email
//   function isValidEmail(email) {
//     let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailReg.test(email);
//   }

//   // Check input
//   function checkInputs() {
//     let dataCustomers = [];
//     let isError = false;

//     // Validate Full Name
//     const valueFullName = fullname.value.trim();
//     if (valueFullName === "") {
//       showError(fullname, "Please input your full name");
//       isError = true;
//     } else if (!isValidFullname(valueFullName)) {
//       showError(fullname, "Please input first & last name with space");
//       isError = true;
//     } else {
//       showError(fullname);
//       dataCustomers.push(valueFullName);
//     }

//     // Validate Email
//     const valueEmail = email.value.trim();
//     if (valueEmail === "") {
//       showError(email, "Please input your email");
//       isError = true;
//     } else if (!isValidEmail(valueEmail)) {
//       showError(email, "Please input a valid email");
//       isError = true;
//     } else {
//       showError(email);
//       dataCustomers.push(valueEmail);
//     }

//     // Validate Subject
//     const valueSubject = subject.value.trim();
//     if (valueSubject === "") {
//       showError(subject, "Please input your subject");
//       isError = true;
//     } else {
//       showError(subject);
//       dataCustomers.push(valueSubject);
//     }

//     // Push company if any
//     const valueCompany = company.value.trim();
//     if (valueCompany !== "") {
//       dataCustomers.push(valueCompany);
//     }

//     // Validate Message
//     const valueMessage = message.value.trim();
//     if (valueMessage === "") {
//       showError(message, "Please input your message");
//       isError = true;
//     } else {
//       showError(message);
//       dataCustomers.push(valueMessage);
//     }

//     return isError ? false : dataCustomers;
//   }

//   // Submit Form and Check All Input
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const isChecked = checkInputs();
//     if (!isChecked) {
//       console.log("resubmit");
//     }
//   });
// }
// validateForm();

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