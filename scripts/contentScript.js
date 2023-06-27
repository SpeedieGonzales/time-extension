const btn_open = document.createElement("button");
const popup = document.createElement("div");

const headSection = document.createElement("section");
const btn_close = document.createElement("button");

const buttonSection = document.createElement("section");
const btn_avrageArival = document.createElement("button");
const btn_goHomeTime = document.createElement("button");
const btn_toggleEdit = document.createElement("button");
const tableSection = document.createElement("section");
const table = document.createElement("table");

const btn_calculateMonth = document.createElement("button");
const input_calculateBegin = document.createElement("input");
const input_calculateEnd = document.createElement("input");
const btn_calculatePeriod = document.createElement("button");
const btn_countAbsences = document.createElement("button");
const betweenSymbol = document.createElement("span");
const div1 = document.createElement("aside");
const div2 = document.createElement("aside");
const div3 = document.createElement("aside");
const div4 = document.createElement("aside");
const parentdiv = document.createElement("aside");

const content1 = document.createElement("aside");
const content1_value = document.createElement("aside");
const content2 = document.createElement("aside");
const content2_value = document.createElement("aside");
const content3 = document.createElement("aside");
const content3_value = document.createElement("aside");
const content4 = document.createElement("aside");
const content4_value = document.createElement("aside");
const selectElement = document.createElement("select");
const fieldsetElement_1 = document.createElement("fieldset");
const legendElement_1 = document.createElement("legend");
const fieldsetElement_2 = document.createElement("fieldset");
const legendElement_2 = document.createElement("legend");
const fieldsetElement_3 = document.createElement("fieldset");
const legendElement_3 = document.createElement("legend");
const fieldsetElement_4 = document.createElement("fieldset");
const legendElement_4 = document.createElement("legend");

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

  buttonSection.appendChild(btn_avrageArival);
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
  var option1 = document.createElement("option");
  option1.text = "Overtime";
  var option2 = document.createElement("option");
  option2.text = "Arrival";
  var option3 = document.createElement("option");
  option3.text = "Absence";
  var option4 = document.createElement("option");
  option4.text = "GoHomeTime";

  content1.classList.add("extraMargin");
  content2.classList.add("extraMargin");
  content3.classList.add("extraMargin");
  content4.classList.add("extraMargin");

  initOvertimeView();
  initAbsenceView();
  initArvivalView();
  initGoHomeView();

  selectElement.add(option1);
  selectElement.add(option2);
  selectElement.add(option3);
  selectElement.add(option4);
  buttonSection.appendChild(selectElement);
  content1.id = "content1";
  content1.classList.add("content");
  content1.appendChild(content1_value);
  content2.id = "content2";
  content2.classList.add("content");
  content2.appendChild(content2_value);
  content3.id = "content3";
  content3.classList.add("content");
  content3.appendChild(content3_value);
  content4.id = "content4";
  content4.classList.add("content");
  content4.appendChild(content4_value);
  var contentElements = document.getElementsByClassName("content");
  selectElement.addEventListener("change", function () {
    table.innerHTML = "";
    for (var i = 0; i < contentElements.length; i++) {
      contentElements[i].classList.remove("active");
    }
    switch(selectElement.value){
      case "Overtime":
        content1.classList.add("active");
        break;
      case "Arrival":
        content2.classList.add("active");
        break;
      case "Absence":
        content3.classList.add("active");
        break;
      case "GoHomeTime":
        content4.classList.add("active");
        break;
      default:
        break;
    }
  });
  tableSection.appendChild(content1);
  tableSection.appendChild(content2);
  tableSection.appendChild(content3);
  tableSection.appendChild(content4);
}
function initGoHomeView(){
  btn_goHomeTime.textContent = "GoHomeTime";
  btn_goHomeTime.classList.add("btn");
  btn_goHomeTime.addEventListener("click", handleAvrageArivalClick);
  legendElement_4.textContent = "GoHomeTime";
  fieldsetElement_4.appendChild(legendElement_4)
  fieldsetElement_4.appendChild(btn_goHomeTime);
  content4_value.appendChild(fieldsetElement_4);
}
function initOvertimeView(){
  btn_calculateMonth.textContent = "Month";
  btn_calculateMonth.classList.add("btn");
  btn_calculateMonth.addEventListener("click", displayMonthCalculate);

  input_calculateBegin.type = "number";
  input_calculateBegin.min = 0;
  input_calculateBegin.max = 31;
  input_calculateBegin.classList.add("normal_input");

  input_calculateEnd.type = "number";
  input_calculateEnd.min = 0;
  input_calculateEnd.max = 31;
  input_calculateEnd.classList.add("normal_input");

  btn_calculatePeriod.textContent = "Period";
  btn_calculatePeriod.classList.add("btn");
  btn_calculatePeriod.addEventListener("click", () => {
    displayPeriodCalculate(
      input_calculateBegin.value,
      input_calculateEnd.value
    );
  });
  betweenSymbol.innerText = "-";

  legendElement_1.textContent = "Overtime";
  fieldsetElement_1.appendChild(legendElement_1)
  fieldsetElement_1.appendChild(input_calculateBegin);
  fieldsetElement_1.appendChild(betweenSymbol);
  fieldsetElement_1.appendChild(input_calculateEnd);
  fieldsetElement_1.appendChild(btn_calculatePeriod);
  fieldsetElement_1.appendChild(btn_calculateMonth);
  content1_value.appendChild(fieldsetElement_1);
}
function initArvivalView(){
  btn_avrageArival.textContent = "Arrival";
  btn_avrageArival.id = 1;
  btn_avrageArival.classList.add("btn");
  btn_avrageArival.classList.add("tablinks");
  btn_avrageArival.addEventListener("click", handleAvrageArivalClick);
  legendElement_2.textContent = "Arrival";
  fieldsetElement_2.appendChild(legendElement_2)
  fieldsetElement_2.appendChild(btn_avrageArival);
  content2_value.appendChild(fieldsetElement_2);
}
function initAbsenceView(){
  btn_countAbsences.textContent = "Count Absences";
  btn_countAbsences.classList.add("btn");
  btn_countAbsences.addEventListener("click", amountOfAbsences);
  legendElement_3.textContent = "Absence";
  fieldsetElement_3.appendChild(legendElement_3)
  fieldsetElement_3.appendChild(btn_countAbsences);
  content3_value.appendChild(fieldsetElement_3);
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
    if (tabID == 3) {
      tableSection.appendChild(content1);
      tableSection.appendChild(content2);
      tableSection.appendChild(content3);
    }
    tableSection.appendChild(table);
  }
  currentTab.classList.add("active");
}
function displayInTable(Value, type, IsPeriod, begin = 0, end = 0) {
  var month = document.querySelector(
    'th[data-r="0"][data-c="1"][class="td_blue "]'
  ).textContent;
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
  displayInTable(countAbsences(), "Absencetime", false);
}
function displayMonthCalculate() {
  displayInTable(calculateOvertimeForMonth(), "Overtime", false);
}
function displayPeriodCalculate(begin, end) {
  if (parseInt(begin) < 10 && !begin.startsWith("0")) {
    begin = "0" + begin;
  }
  if (parseInt(end) < 10 && !end.startsWith("0")) {
    end = "0" + end;
  }
  displayInTable(
    calculateOvertimeByPeriod(begin, end),
    "Overtime",
    true,
    begin,
    end
  );
}
function handleAvrageArivalClick() {
  displayInTable(getAvrageArival(), "Arival", false);
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
