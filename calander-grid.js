const maxEventsPerRequest = "50"
  , today = new Date
  , months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  , monthAndYear = document.getElementById("monthAndYear")
  , eventListContainer = document.getElementById("event-list");
let currentMonth = today.getMonth()
  , currentYear = today.getFullYear()
  , eventData = {};
function daysInMonth(e, t) {
    return 32 - new Date(t,e,32).getDate()
}
function getMonthBoundaries(e, t) {
    let n = {}
      , a = new Date(e,t + 1,1)
      , r = new Date(e,t,1);
    return n.first = r.toISOString().substr(0, 10),
    n.last = a.toISOString().substr(0, 10),
    n
}
function activateCell(e) {
    const t = document.querySelectorAll("#calendar-body td a");
    for (var n = 0; n < t.length; n++)
        t[n].getAttribute("data-day") === e ? t[n].classList.add("active") : t[n].classList.remove("active")
}
function pad(e) {
    return (e < 10 ? "0" : "") + e
}
function initiateLoadingMessage() {
    eventListContainer.innerHTML = '<p><span class="fas fa-sync-alt fa-spin"></span>&nbsp;&nbsp;Loading</p>'
}
function getJSON(e, t, n) {
    const a = e ? "&start=" + e : ""
      , r = t ? "&end=" + t : ""
      , o = "&pp=" + maxEventsPerRequest;
    let s = ""
      , i = "";
    "undefined" != typeof localistExcludeTypes && (i = localistExcludeTypes.length ? "&exclude_type=" + localistExcludeTypes.join("%2C") : ""),
    "undefined" != typeof localistFilter && (s = localistFilter ? "&type=" + localistFilter : "");
    let l = "";
    "undefined" != typeof localistKeyword && (l = localistKeyword ? "&keyword=" + localistKeyword : "");
    let c = "";
    "undefined" != typeof localistVenue && (c = localistVenue ? "&venue_id=" + localistVenue : "");
    let d = "https://events.in.gov/api/2/events?group_id=" + localistGroupId + s + i + l + c + o + a + r
      , u = new XMLHttpRequest;
    u.open("GET", d),
    u.responseType = "json",
    u.onload = function() {
        200 == u.status ? (eventData = u.response,
        n()) : (console.log("Error getting events"),
        eventListContainer.innerHTML = "<p>Error getting events</p>")
    }
    ,
    u.send()
}
function showCalendar(e, t) {
    const n = new Date(t,e).getDay()
      , a = document.getElementById("#");
    a.innerHTML = "",
    monthAndYear.innerHTML = months[e] + " " + t;
    let r = 1;
    for (let o = 0; o < 6; o++)
        if (r <= daysInMonth(e, t)) {
            let s = document.createElement("tr");
            for (let a = 0; a < 7; a++)
                if (0 === o && a < n || r > daysInMonth(e, t)) {
                    const e = document.createElement("td")
                      , t = document.createTextNode("");
                    e.appendChild(t),
                    s.appendChild(e)
                } else {
                    const n = document.createElement("td")
                      , a = document.createElement("a")
                      , o = document.createTextNode(r);
                    a.setAttribute("data-day", r),
                    a.ariaLabel = months[today.getMonth()] + " " + r,
                    r === today.getDate() && t === today.getFullYear() && e === today.getMonth() && a.classList.add("active"),
                    a.appendChild(o),
                    n.appendChild(a),
                    s.appendChild(n),
                    r++
                }
            a.appendChild(s)
        }
    const o = document.querySelectorAll("#calendar-body td a");
    for (var s = 0; s < o.length; s++)
        o[s].addEventListener("click", (function() {
            choseDate(this.getAttribute("data-day"))
        }
        ), !1)
}
function processEvents() {
    if (eventData.events && eventData.events.length) {
        let e = document.createElement("ul");
        for (let t = 0; t < eventData.events.length; t++) {
            const n = new Date(eventData.events[t].event.event_instances[0].event_instance.start)
              , a = n.toLocaleString("en", {
                day: "numeric"
            })
              , r = n.toLocaleTimeString("en", {
                timeStyle: "short",
                hour12: !0,
                timeZone: "America/Indiana/Indianapolis"
            });
            if (eventData.events[t].event && eventData.events[t].event.first_date) {
                const e = document.querySelector("[data-day='" + a + "']");
                e && e.parentNode.classList.add("highlight")
            }
            if (eventData.events[t].event) {
                const o = eventData.events[t].event.title
                  , s = eventData.events[t].event.localist_url
                  , i = eventData.events[t].event.location_name
                  , l = eventData.events[t].event.venue_url;
                let c = "";
                if (i && l ? c = `<p><span class="location-label">Location:</span><a class="location-link" href="${l}" target="_blank">${i}</a></p>` : i && (c = `<p><span class="location-label">Location:</span>${i}</p>`),
                0 !== a) {
                    const t = `<li>\n                            <div class="event-item-details">\n                                <a href="${s}" target="_blank">${o}</a>\n                                ${c}\n                            </div>\n                            <div class="event-item-date">\n                                <p>${months[n.getMonth()]} ${a}</p>\n                                <p>${r}</p> \n                            </div>\n                        </li>`;
                    e.insertAdjacentHTML("beforeend", t)
                }
            }
        }
        eventListContainer.innerHTML = "",
        eventListContainer.appendChild(e)
    } else
        eventListContainer.innerHTML = "<p>No Events Found</p>"
}
function next() {
    currentYear = 11 === currentMonth ? currentYear + 1 : currentYear,
    currentMonth = (currentMonth + 1) % 12,
    showCalendar(currentMonth, currentYear),
    initiateLoadingMessage();
    let e = getMonthBoundaries(currentYear, currentMonth);
    getJSON(e.first, e.last, processEvents)
}
function previous() {
    currentYear = 0 === currentMonth ? currentYear - 1 : currentYear,
    currentMonth = 0 === currentMonth ? 11 : currentMonth - 1,
    showCalendar(currentMonth, currentYear),
    initiateLoadingMessage();
    let e = getMonthBoundaries(currentYear, currentMonth);
    getJSON(e.first, e.last, processEvents)
}
function choseDate(e) {
    const t = currentYear + "-" + pad(currentMonth + 1) + "-" + pad(e);
    e && (initiateLoadingMessage(),
    activateCell(pad(e)),
    getJSON(t, null, processEvents))
}
function choseToday() {
    const e = currentYear + "-" + pad(currentMonth + 1) + "-" + pad(today.getDate())
      , t = currentYear + "-" + pad(currentMonth + 1) + "-" + pad(today.getDate() + 1);
    initiateLoadingMessage(),
    activateCell(pad(today.getDate())),
    getJSON(e, t, processEvents)
}
showCalendar(currentMonth, currentYear);
let intialMonthBoundaries = getMonthBoundaries(currentYear, currentMonth);
localistGroupId ? getJSON(null, intialMonthBoundaries.last, processEvents) : console.error("No group ID provided for calendar grid");
