chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["style/style.css"],
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/contentScript.js", "scripts/contentViews.js", "scripts/display.js", "scripts/drag.js", "scripts/dropdownView.js", "scripts/utility.js", "scripts/api/api.js", "scripts/api/classes/absence.js", "scripts/api/classes/day.js", "scripts/api/classes/timestamp.js", "scripts/calculator/absence.js", "scripts/calculator/amountOfDaysForOvertime.js", "scripts/calculator/arrival.js", "scripts/calculator/expectedOvertime.js", "scripts/calculator/goHomeTime.js", "scripts/calculator/overtime.js", "scripts/calculator/overtimePerDay.js", "scripts/calculator/utilityCalculator.js", "scripts/classes/Button.js", "scripts/classes/Div.js", "scripts/classes/H3.js", "scripts/classes/Infolabel.js", "scripts/classes/Inputfield.js", "scripts/classes/MenuButton.js", "scripts/classes/timeParser.js"],
  });
});
