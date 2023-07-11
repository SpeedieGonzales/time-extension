chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["style/style.css"],
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [
      "scripts/calculator/utilityCalculator.js",
      "scripts/calculator/overtimePerDay.js",
      "scripts/calculator/overtime.js",
      "scripts/calculator/goHomeTime.js",
      "scripts/calculator/expectedOvertime.js",
      "scripts/calculator/arrival.js",
      "scripts/calculator/amountOfDaysForOvertime.js",
      "scripts/calculator/absence.js",
      "scripts/classes/Div.js",
      "scripts/classes/H3.js",
      "scripts/classes/Infolabel.js",
      "scripts/classes/Inputfield.js",
      "scripts/classes/MenuButton.js",
      "scripts/classes/Button.js",
      "scripts/display.js",
      "scripts/utility.js",
      "scripts/contentViews.js",
      "scripts/dropdownView.js",
      "scripts/timeParser.js",
      "scripts/drag.js",
      "scripts/contentScript.js",
    ],
  });
});
