let lectures = document.querySelectorAll(".lecture");
let container = document.querySelector(".lectures");

// Get the current date and time
var currentTime = new Date();

// Extract hours, minutes, and seconds from the current time
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();

minutes = minutes < 10 ? "0" + minutes : minutes;
// Create a string to display the time
var timeString = hours + ":" + minutes + ":" + seconds;

let day = "";
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "monday";
    break;
  case 2:
    day = "tuesday";
    break;
  case 3:
    day = "wednesday";
    break;
  case 4:
    day = "thursday";
    break;
  case 5:
    day = "friday";
    break;
  case 6:
    day = "saturday";
}

checkLecture();

let update = setInterval(checkLecture, 30000);

function checkLecture() {
  for (let lecture of lectures) {
    lecture.style.backgroundColor = "";
  }

  if (timeString >= "9:00:00" && timeString <= "10:00:00") {
    lectures[0].style.backgroundColor = "aquamarine";
  } else if (timeString >= "10:00:00" && timeString <= "11:00:00") {
    lectures[1].style.backgroundColor = "aquamarine";
  } else if (timeString >= "11:00:00" && timeString <= "12:00:00") {
    lectures[2].style.backgroundColor = "aquamarine";
  } else if (timeString >= "12:00:00" && timeString <= "12:45:00") {
    container.innerHTML = `<div class="others"><img src="lunchtime.png" alt="" /><h3>It's lunch time</h3></div>`;
  } else if (timeString >= "12:45:00" && timeString <= "13:45:00") {
    lectures[3].style.backgroundColor = "aquamarine";
  } else if (timeString >= "13:45:00" && timeString <= "14:45:00") {
    lectures[4].style.backgroundColor = "aquamarine";
  } else if (timeString >= "14:45:00" && timeString <= "15:45:00") {
    lectures[5].style.backgroundColor = "aquamarine";
  } else {
    container.innerHTML = `<div class="others"><img src="lectures over.png" alt="" /><h3>All Sessions  are Ended</h3></div>`;
  }
}

if (day == "Sunday") {
  container.innerHTML = `<div class="others"><img src="Holiday.png" alt="" /><h3>It's non working day</h3></div>`;
} else {
  let todayLecs = Android.executeQuery(`SELECT ${day} FROM timetable`);
  todayLecs = JSON.parse(todayLecs);

  let lecsCount = 0;

  for (let todayLec of todayLecs) {
    lectures[lecsCount].innerHTML = todayLec[day].replace(/\//g, "<br/>");
    lecsCount++;
  }
}
