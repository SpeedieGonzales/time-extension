const btn_open = new MenuButton(`url('${chrome.runtime.getURL("img/open.png")}')`, ["blank", "position-fixed"], showPopup);
const popup = new Div("popup", "position-fixed");

const headSection = document.createElement("section");
const btn_close = new MenuButton(`url('${chrome.runtime.getURL("img/close.png")}')`, ["blank"], handleCloseClick);

const buttonSection = document.createElement("section");

const table = document.createElement("table");
const tableSection = document.createElement("section");

const selectElement = document.createElement("select");

const btn_toggleEdit = new MenuButton("Editable", ["tablinks"], handleToggleEditClick, 2)
const btn_fillDatabase = new MenuButton("FillDatabase", ["tablinks"], Api.filldatabaseWithMonth)

var currentTab = "";

initPopup();
openPopup();
dragElement(popup);

function initPopup() {

  popup.id = "popup";
  popup.classList.add("position-fixed");

  headSection.id = "popup_header";
  headSection.style.backgroundImage = `url('${chrome.runtime.getURL(
    "img/icon/icon16.png"
  )}')`;

  btn_toggleEdit.addEventListener("click", function () {
    openTab(2);
  });
  buttonSection.classList.add("section", "tab");

  tableSection.classList.add("section", "table-section");

  table.id = "ContentTable";

  headSection.appendChild(btn_close);

  buttonSection.appendChild(btn_toggleEdit);
  buttonSection.appendChild(btn_fillDatabase);
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