let times = document.querySelectorAll(".times");
let lectures = document.querySelectorAll(".lectures");

let lecsQuery =
  "SELECT monday,tuesday,wednesday,thursday,friday,saturday FROM timetable";

var lecsResult = Android.executeQuery(lecsQuery);

let lecsData = JSON.parse(lecsResult);

// let datas =;

let timeDatas = Android.executeQuery("SELECT time FROM timetable");

timeDatas = JSON.parse(timeDatas);

let count = 0;
for (let data of lecsData) {
  for (let j in data) {
    lectures[count].innerHTML = data[j].replace(/\//g, "<br/>");
    count++;
  }
}

let timeCount = 0;

for (let timeData of timeDatas) {
  times[timeCount].innerHTML = timeData.time.replace(/\//g, "<br/>");
  timeCount++;
}
