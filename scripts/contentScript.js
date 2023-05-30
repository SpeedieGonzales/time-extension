const popup = document.createElement("div");

const headSection = document.createElement("section");

const buttonSection = document.createElement("section");
const btn_avrageArival = document.createElement("button");
const btn_toggleEdit = document.createElement("button");
const btn_calculate = document.createElement("button");

const tableSection = document.createElement("section");
const table = document.createElement("table");

initPopup();
dragElement(popup);

function initPopup() {
  // Create the popup element
  popup.id = "popup";

  headSection.id = "popup_header";

  buttonSection.classList.add("section");
  buttonSection.classList.add("tab");

  tableSection.classList.add("section");

  btn_avrageArival.textContent = "Arrival";
  btn_avrageArival.id = 1;
  btn_avrageArival.classList.add("btn");
  btn_avrageArival.classList.add("tablinks");
  btn_avrageArival.addEventListener("click", handleAvrageArivalClick);
  btn_avrageArival.addEventListener("click", function () {
    openTab(1);
  });

  btn_toggleEdit.textContent = "Editable";
  btn_toggleEdit.id = 2;
  btn_toggleEdit.classList.add("btn");
  btn_toggleEdit.classList.add("tablinks");
  btn_toggleEdit.addEventListener("click", handleToggleEditClick);
  btn_toggleEdit.addEventListener("click", function () {
    openTab(2);
  });

  btn_calculate.textContent = "Calculate";
  btn_calculate.id = 3;
  btn_calculate.classList.add("btn");
  btn_calculate.classList.add("tablinks");
  btn_calculate.addEventListener("click", displayCalculateStuff);
  btn_calculate.addEventListener("click", function () {
    openTab(3);
  });

  buttonSection.appendChild(btn_avrageArival);
  buttonSection.appendChild(btn_toggleEdit);
  buttonSection.appendChild(btn_calculate);

  tableSection.appendChild(table);

  popup.appendChild(headSection);
  popup.appendChild(buttonSection);
  popup.appendChild(tableSection);

  document.body.appendChild(popup);
}

function openTab(tabID) {
  var tablinks = document.getElementsByClassName("tablinks");
  Array.from(tablinks).forEach(function (tablink) {
    tablink.className = tablink.className.replace(" active", "");
  });
  var currentTab = document.getElementById(tabID);
  currentTab.classList.add("active");
}
function displayCalculateStuff() {}
function handleAvrageArivalClick() {
  var avrageArival = getAvrageArival();
  displayAvrageArival(avrageArival);
}
function handleToggleEditClick() {
  // if (btn_toggleEdit.style.backgroundColor == "blue") {
  //   btn_toggleEdit.style.backgroundColor = "red";
  //} else {
  //  btn_toggleEdit.style.backgroundColor = "blue";
  //}
  toggleContentEditableOfArivalTimes();
}

function displayAvrageArival(avrageArival) {
  var month = document.querySelector(
    'th[data-r="0"][data-c="1"][class="td_blue "]'
  ).textContent;

  const row = document.createElement("tr");

  const labelCell = document.createElement("td");
  labelCell.innerHTML = "Average Arival in <strong>" + month + "</strong>";
  const timeCell = document.createElement("td");
  timeCell.style.textAlign = "right";
  timeCell.textContent = avrageArival;

  row.appendChild(labelCell);
  row.appendChild(timeCell);

  table.appendChild(row);
}

function toggleContentEditableOfArivalTimes() {
  const elements = document.querySelectorAll('td[data-c="8"]:not(.td_green)');

  elements.forEach(function (element) {
    if (element.contentEditable == "true") {
      element.contentEditable = "false";
    } else {
      element.contentEditable = "true";
    }
  });
}

function getAvrageArival() {
  const elements = document.querySelectorAll('td[data-c="8"]');
  var list = [];
  elements.forEach(function (element) {
    if (element.textContent != "") {
      var time = element.textContent;
      const [hours, minutes] = time.split(":");
      var houresAndMinutes = Number(hours) + Number(minutes) / 60;
      list.push(houresAndMinutes);
    }
  });

  var allTimes = 0;
  list.forEach(function (time) {
    allTimes += time;
  });
  var avrageTime = allTimes / list.length;
  var hours = Math.floor(avrageTime);
  var minutes = String(Math.floor((avrageTime - hours) * 60));
  if (minutes.length <= 1) {
    minutes = "0" + minutes;
  }
  var avrageTimeStr = " " + String(hours) + ":" + minutes;
  return avrageTimeStr;
}
