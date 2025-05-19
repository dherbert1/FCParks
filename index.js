// === Initial Loading Animation ===
function initialLoading() {
  const container = document.querySelector(".homepage");
  const loading = document.querySelector(".loading");
  const images = container?.querySelectorAll("img") || [];
  const imgLoad = imagesLoaded(container);
  let loadedCount = 0;

  // imgLoad
  //   .on("progress", () => {
  //     loadedCount++;
  //     const percent = Math.floor((loadedCount / images.length) * 100);
  //     updateLoadingBar(percent);
  //   })
  //   .on("fail", (instance) => {
  //     console.warn("⚠️ Some images failed to load. This may be expected.");
  //     instance.images.forEach((img) => {
  //       if (!img.isLoaded) {
  //         console.warn("❌ Failed image:", img.img?.src);
  //       }
  //     });
  //   })
  //   .on("done", () => {
  //     console.log("✅ All visible images loaded.");
  //   })
  //   .on("always", () => {
  //     console.log("✅ Image loading process finished.");
  //     loading?.classList.toggle("--loaded");
  //     container?.classList.remove("--disable-scroll");
  //   });
}

// function updateLoadingBar(percent) {
//   const progress = document.querySelector(".loading-bar");
//   const percentText = document.querySelector(".loading__inner-per");
//   if (progress && percentText) {
//     progress.style.width = `${percent}%`;
//     percentText.innerHTML = `${percent}%`;
//   }
// }

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

// FOR EVENTS PAGE JS
const calendarDays = document.getElementById('calendarDays');
const eventListTitle = document.getElementById('eventListTitle');
const eventsContainer = document.getElementById('eventsContainer');
const calendarTitle = document.getElementById('calendarTitle');

let events = [];
let currentDate = new Date();

fetch('events.json')
  .then(res => res.json())
  .then(data => {
    events = data;
    renderCalendar();
    renderEventListForMonth();
  });

function changeMonth(diff) {
  currentDate.setMonth(currentDate.getMonth() + diff);
  renderCalendar();
  renderEventListForMonth();
}

function renderCalendar() {
  calendarDays.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  calendarTitle.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.textContent = day;
    calendarDays.appendChild(cell);
  });

  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    calendarDays.appendChild(cell);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    cell.textContent = i;

    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = events.filter(e => {
      const eventStart = new Date(e.start);
      const eventEnd = new Date(e.end || e.start);
      const currentDay = new Date(fullDate);
      return currentDay >= eventStart && currentDay <= eventEnd;
    });


    if (dayEvents.length > 0) cell.classList.add('has-event');
    if (new Date().toDateString() === new Date(year, month, i).toDateString()) cell.classList.add('today');

    cell.onclick = () => renderEventList(dayEvents, `Events on ${fullDate}`);

    calendarDays.appendChild(cell);
  }
}

function renderEventListForMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthEvents = events.filter(e => new Date(e.start).getFullYear() === year && new Date(e.start).getMonth() === month);
  renderEventList(monthEvents, 'Events This Month:');
}

function renderEventList(eventArray, title) {
  eventListTitle.textContent = title;
  eventsContainer.innerHTML = '';
  if (eventArray.length === 0) {
    eventsContainer.innerHTML = '<p>No events found.</p>';
    return;
  }
  eventArray.sort((a, b) => new Date(a.start) - new Date(b.start));
  eventArray.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-item';

    const link = document.createElement('a');
    link.href = event.url || '#';
    link.target = '_blank';
    link.className = 'event-title';
    link.textContent = event.title;

    const loc = document.createElement('span');
    loc.className = 'event-location';
    loc.textContent = `Location: ${event.location || 'N/A'}`;

    const time = document.createElement('div');
    time.className = 'event-time';
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;
    if (event.note && event.note.includes('TBD')) {
      time.textContent = `${start.toLocaleString('default', { month: 'long', year: 'numeric' })} (Dates TBD)`;
    } else {
      time.textContent = end && start.toDateString() !== end.toDateString()
        ? `${start.toDateString()} – ${end.toDateString()}`
        : start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    div.appendChild(link);
    div.appendChild(loc);
    div.appendChild(time);
    eventsContainer.appendChild(div);
  });
}

function goToToday() {
  currentDate = new Date();
  renderCalendar();
  const todayStr = currentDate.toISOString().split('T')[0];
  const todayEvents = events.filter(e => {
    const eventDate = new Date(e.start);
    const matchesToday = e.start.startsWith(todayStr);
    const matchesRecurring = e.recurring === "yearly" && eventDate.getDate() === currentDate.getDate() && eventDate.getMonth() === currentDate.getMonth();
    return matchesToday || matchesRecurring;
  });
  renderEventList(todayEvents, `Events Today (${todayStr})`);
}

function viewAllEvents() {
  const modal = document.getElementById('allEventsModal');
  const container = document.getElementById('allEventsContainer');
  container.innerHTML = 'Loading events...';

  const allEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
  if (allEvents.length === 0) {
    container.innerHTML = '<p>No events found.</p>';
    return;
  }

  container.innerHTML = '';
  allEvents.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-item';

    const link = document.createElement('a');
    link.href = event.url || '#';
    link.target = '_blank';
    link.className = 'event-title';
    link.textContent = event.title;

    const loc = document.createElement('span');
    loc.className = 'event-location';
    loc.textContent = `Location: ${event.location || 'N/A'}`;

    const time = document.createElement('div');
    time.className = 'event-time';
    time.textContent = new Date(event.start).toLocaleString();

    div.appendChild(link);
    div.appendChild(loc);
    div.appendChild(time);
    container.appendChild(div);
  });

  modal.style.display = 'flex';
}