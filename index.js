document.addEventListener("DOMContentLoaded", () => {
  let pageLoaded = document.querySelector("iframe");

  let home = document.querySelector(".home");
  let timetable = document.querySelector(".timetable");
  let edittab = document.querySelector(".edittab");

  let homeicon = document.querySelector(".fa-house-chimney");
  let timetableicon = document.querySelector(".fa-calendar-range");
  let edittabicon = document.querySelector(".fa-pen-to-square");

  let navbar = document.querySelector(".navbar");

  navbar.addEventListener("click", (event) => {
    if (event.target.closest(".home") || event.target.closest(".h")) {
      pageLoaded.src = "home.html";
    } else if (
      event.target.closest(".timetable") ||
      event.target.closest(".t")
    ) {
      pageLoaded.src = "timetable.html";
    } else if (event.target.closest(".edittab") || event.target.closest(".e")) {
      pageLoaded.src = "edite.html";
    }
  });

  function checkPageloaded() {
    // Reset classes
    home.classList.remove("iconVisited");
    timetable.classList.remove("iconVisited");
    edittab.classList.remove("iconVisited");

    homeicon.classList.replace("fa-solid", "fa-regular");
    timetableicon.classList.replace("fa-solid", "fa-light");
    edittabicon.classList.replace("fa-solid", "fa-regular");

    // Add appropriate classes based on iframe src
    if (pageLoaded.src.endsWith("home.html")) {
      home.classList.add("iconVisited");
      homeicon.classList.replace("fa-regular", "fa-solid");
    } else if (pageLoaded.src.endsWith("timetable.html")) {
      timetable.classList.add("iconVisited");
      timetableicon.classList.replace("fa-light", "fa-solid");
    } else if (pageLoaded.src.endsWith("edite.html")) {
      edittab.classList.add("iconVisited");
      edittabicon.classList.replace("fa-regular", "fa-solid");
    }
  }

  // Initial check
  checkPageloaded();

  // Observe changes in the iframe
  const observer = new MutationObserver(checkPageloaded);
  observer.observe(pageLoaded, {
    attributes: true,
    attributeFilter: ["src"],
  });
});

function onBackPressed() {
  checkPageloaded();
}
