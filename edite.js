let query = "";
let count = 0;
let alphaCount = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

let heading = document.querySelector("h3");
let buttons = document.querySelector(".buttons");
let form = document.querySelector("form");
let addButton = document.querySelector(".add");
let editButton = document.querySelector(".edit");
let selectLec = document.querySelector(".selectLec");

addButton.addEventListener("click", () => {
  query = `CREATE TABLE IF NOT EXISTS timetable (lecture TEXT,time TEXT, monday TEXT, tuesday TEXT, wednesday TEXT, thursday TEXT, friday TEXT, saturday TEXT)`;

  Android.executeQuery(query);

  buttons.style.display = "none";
  form.style.display = "flex";
  form.addEventListener("submit", saveData);
});

editButton.addEventListener("click", () => {
  buttons.style.display = "none";
  selectLec.style.display = "flex";
  let ul = document.createElement("ul");
  selectLec.appendChild(ul);
  let lectures = Android.executeQuery("SELECT lecture FROM timetable");
  lectures = JSON.parse(lectures);

  for (let lecture of lectures) {
    let li = document.createElement("li");
    li.innerText = lecture.lecture;
    ul.appendChild(li);

    li.addEventListener("click", (event) => {
      heading.innerText = event.target.innerText;

      selectLec.style.display = "none";
      form.style.display = "flex";

      let defaultdatas = Android.executeQuery(
        `SELECT time,monday,tuesday,wednesday,thursday,friday,saturday FROM timetable WHERE lecture='${heading.innerText}'`
      );
      defaultdatas = JSON.parse(defaultdatas);

      let countd = 0;
      for (let defaultdata of defaultdatas) {
        for (let data in defaultdata) {
          form[countd].value = defaultdata[data];
          countd++;
        }
      }
    });
  }

  form.addEventListener("submit", editData);
});

function saveData(event) {
  event.preventDefault();

  let insertData = `INSERT INTO timetable VALUES ('${heading.innerText}','${form[0].value}','${form[1].value}','${form[2].value}','${form[3].value}','${form[4].value}','${form[5].value}','${form[6].value}')`;

  Android.executeQuery(insertData);

  alert("Data saved Successfully");

  form.reset();

  count++;
  heading.innerText = alphaCount[count] + " Lecture";

  if (count == 6) {
    form.style.display = "none";
    buttons.style.display = "flex";
  }
}

function editData(event) {
  event.preventDefault();

  let insertData = `UPDATE timetable SET time = '${form[0].value}', monday = '${form[1].value}', tuesday = '${form[2].value}', wednesday = '${form[3].value}', thursday = '${form[4].value}', friday = '${form[5].value}', saturday = '${form[6].value}' WHERE lecture = '${heading.innerText}'`;

  Android.executeQuery(insertData);

  alert("Data updated Successfully");
  form.style.display = "none";
  buttons.style.display = "flex";
}

function deleteDatabase() {
  let query = "DROP TABLE timetable";
  Android.executeQuery(query);
  alert("Your Time table is deleted");
}
