chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['style/style.css'],
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/drag.js', 'scripts/contentScript.js']
    });
});
