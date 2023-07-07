const btn_open = document.createElement("button");
const popup = document.createElement("div");

const headSection = document.createElement("section");
const btn_close = document.createElement("button");

const buttonSection = document.createElement("section");

const btn_toggleEdit = document.createElement("button");
const tableSection = document.createElement("section");
const table = document.createElement("table");

const selectElement = document.createElement("select");

var currentTab = "";

initPopup();
openPopup();
dragElement(popup);

function initPopup() {
  btn_open.classList.add("btn");
  btn_open.classList.add("blank");
  btn_open.classList.add("position-fixed");
  btn_open.style.backgroundImage = `url('${chrome.runtime.getURL(
    "img/open.png"
  )}')`;
  btn_open.addEventListener("click", showPopup);

  popup.id = "popup";
  popup.classList.add("position-fixed");

  headSection.id = "popup_header";
  headSection.style.backgroundImage = `url('${chrome.runtime.getURL(
    "img/icon/icon16.png"
  )}')`;

  btn_close.classList.add("btn");
  btn_close.classList.add("blank");
  btn_close.style.backgroundImage = `url('${chrome.runtime.getURL(
    "img/close.png"
  )}')`;
  btn_close.addEventListener("click", handleCloseClick);

  buttonSection.classList.add("section");
  buttonSection.classList.add("tab");

  tableSection.classList.add("section", "table-section");

  table.id = "ContentTable";

  headSection.appendChild(btn_close);

  buttonSection.appendChild(btn_toggleEdit);
  btn_toggleEdit.textContent = "Editable";
  btn_toggleEdit.id = 2;
  btn_toggleEdit.classList.add("btn");
  btn_toggleEdit.classList.add("tablinks");
  btn_toggleEdit.addEventListener("click", function () {
    openTab(2);
  });
  btn_toggleEdit.addEventListener("click", handleToggleEditClick);

  buttonSection.appendChild(btn_toggleEdit);
  initDropdown();

  tableSection.appendChild(table);

  popup.appendChild(headSection);
  popup.appendChild(buttonSection);
  popup.appendChild(tableSection);
}
function initDropdown() {
  new ContentViews(selectElement, tableSection);
  selectElement.classList.add("AsButtonDesign");
  buttonSection.appendChild(selectElement);
  var contentElements = document.getElementsByClassName("content");
  selectElement.addEventListener("change", function () {
    table.innerHTML = "";
    for (var i = 0; i < contentElements.length; i++) {
      contentElements[i].classList.remove("active");
    }
    var id = selectElement.selectedOptions[0].id.charAt(
      selectElement.selectedOptions[0].id.length - 1
    );
    document.getElementById("content" + id).classList.add("active");
  });
}

function openPopup() {
  document.body.appendChild(popup);
  document.body.appendChild(btn_open);
  showPopup();
}
function showPopup() {
  popup.style.display = "block";
  btn_open.style.display = "none";
}

function handleCloseClick(element, event) {
  console.debug(element);
  console.debug(event);
  popup.style.display = "none";
  btn_open.style.display = "block";
}

function openTab(tabID) {
  var tablinks = document.getElementsByClassName("tablinks");
  Array.from(tablinks).forEach(function (tablink) {
    tablink.className = tablink.className.replace(" active", "");
  });
  var currentTabByID = document.getElementById(tabID);
  if (currentTab.id != tabID || currentTab.length == 0) {
    table.innerHTML = "";
    currentTab = currentTabByID;
    tableSection.innerHTML = "";
    tableSection.appendChild(table);
  }
  currentTab.classList.add("active");
}
function displayInTable(Value, type, IsPeriod, begin = 0, end = 0) {
  var month = "";
  if(Array.isArray(Value)){
    month = Value[1] + " Days";
    Value = Value[0];
  }else{
    Value = formatTime(Value);
    month = document.querySelector(
      'th[data-r="0"][data-c="1"][class="td_blue "]'
    ).textContent;
  }
  const row = document.createElement("tr");
  const labelCell = document.createElement("td");
  if (IsPeriod) {
    labelCell.innerHTML =
      type + " from <strong>" + begin + " - " + end + "" + month + "</strong>";
  } else {
    labelCell.innerHTML = type + " in <strong>" + month + "</strong>";
  }
  const timeCell = document.createElement("td");
  timeCell.style.textAlign = "right";
  timeCell.textContent = Value;

  row.appendChild(labelCell);
  row.appendChild(timeCell);
  table.appendChild(row);
}

function amountOfAbsences() {
  displayInTable(countAbsences(false), "Absencetime", false);
}
function periodOfAbsences(begin, end){
  displayInTable(countAbsences(true, begin, end), "Absencetime", false);
}
function displayMonthCalculate() {
  displayInTable(calculateOvertimeForMonth(), "Overtime", false);
}
function displayCurrentOvertime(){
  displayInTable(calculateCurrentOvertime(), "Expected Overtime", false);
}
function displayCurrentOvertimeWithSpecificValues(hours = 0, minutes = 0, pause = 0){
  displayInTable(calculateCurrentOvertime(hours, minutes, pause), "Expected Overtime", false);
}
function displayPeriodCalculate(begin, end) {
  displayInTable(
    calculateOvertimeByPeriod(begin, end),
    "Overtime",
    true,
    begin,
    end
  );
}
function displayCalculateOfOvertimePerDay(weeks, days, hours){
  displayInTable(calculateDailyOvertimeByGoal(weeks, days,hours), "Overtime per Day ", false);
}
function handleAvrageArivalClick() {
  displayInTable(getAvrageArival(false), "Arival", false);
}
function periodAverageArival(begin, end){
  displayInTable(getAvrageArival(true, begin, end), "Arival", false);
}
function handleToggleEditClick() {
  toggleContentEditableOfArivalTimes();
}

function toggleContentEditableOfArivalTimes() {
  const elements = document.querySelectorAll('td[data-c="8"]:not(.td_green)');

  elements.forEach(function (element) {
    if (element.contentEditable == "true") {
      element.contentEditable = "false";
      element.style.removeProperty("background-color");
    } else {
      element.contentEditable = "true";
      element.style.backgroundColor = "yellow";
    }
  });
}
