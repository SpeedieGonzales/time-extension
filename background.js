chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['style/style.css'],
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/utility.js','scripts/contentViews.js','scripts/dropdownView.js','scripts/timeParser.js','scripts/calculator.js', 'scripts/drag.js', 'scripts/contentScript.js']
    });
});
