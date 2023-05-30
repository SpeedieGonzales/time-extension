//import { dragElement } from './drag.js';

const popup = document.createElement('div');

const headSection = document.createElement('section');

const buttonSection = document.createElement('section');
const button1 = document.createElement('button');
const button2 = document.createElement('button');

const tableSection = document.createElement('section');
const table = document.createElement('table');

initPopup();
dragElement(popup);

function initPopup() {
    // Create the popup element
    popup.id = "popup_";
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.paddingBottom = '10px';
    popup.style.border = '1px solid #D3D3D3';
    popup.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    popup.style.borderRadius = '10px'; // Rounded corners

    headSection.id = "popup_header";
    headSection.style.height = "25px";
    headSection.style.width = "100%";
    headSection.style.backgroundColor = "#D3D3D3";
    headSection.style.cursor = 'move';

    buttonSection.style.margin = '5px';

    tableSection.style.margin = '5px';
    // Create buttons
    button1.textContent = 'Avrage arival this Month';
    button1.style.marginRight = '5px'; // Add some spacing between buttons
    button1.style.padding = '8px 16px'; // Adjust button padding
    button1.style.border = 'none'; // Remove button border
    button1.style.borderRadius = '4px'; // Rounded button corners
    button1.style.backgroundColor = '#4CAF50'; // Button background color
    button1.style.color = '#fff'; // Button text color
    button1.style.cursor = 'pointer'; // Show pointer cursor on hover
    button1.addEventListener('click', handleButton1Click);

    button2.textContent = 'Toggle editeble';
    button2.style.padding = '8px 16px'; // Adjust button padding
    button2.style.border = 'none'; // Remove button border
    button2.style.borderRadius = '4px'; // Rounded button corners
    button2.style.backgroundColor = 'red'; // Button background color
    button2.style.color = '#fff'; // Button text color
    button2.style.cursor = 'pointer'; // Show pointer cursor on hover
    button2.addEventListener('click', handleButton2Click);

    // Append buttons to the popup
    buttonSection.appendChild(button1);
    buttonSection.appendChild(button2);

    tableSection.appendChild(table);

    popup.appendChild(headSection);
    popup.appendChild(buttonSection);
    popup.appendChild(tableSection);

    document.body.appendChild(popup);
}

function handleButton1Click() {
    var avrageArival = getAvrageArival();
    displayAvrageArival(avrageArival);
}
function handleButton2Click() {
    if (button2.style.backgroundColor == "blue") {
        button2.style.backgroundColor = "red";
    } else {
        button2.style.backgroundColor = "blue";
    }
    toggleContentEditableOfArivalTimes();
}

function displayAvrageArival(avrageArival) {

    var month = document.querySelector('th[data-r="0"][data-c="1"][class="td_blue "]').textContent;

    const row = document.createElement('tr');

    const labelCell = document.createElement('td');
    labelCell.innerHTML = 'Average Arival in <strong>' + month + '</strong>';
    const timeCell = document.createElement('td');
    timeCell.style.textAlign = 'right';
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
            const [hours, minutes] = time.split(':');
            var houresAndMinutes = Number(hours) + (Number(minutes) / 60);
            list.push(houresAndMinutes)
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


















//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Make the DIV element draggable:

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        popup.style.right = 'unset';
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}