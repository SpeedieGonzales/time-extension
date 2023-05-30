// This script runs as a service worker and handles the extension's background processes.

// When the browser action is clicked, inject the content script into the current tab.
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['contentScript.js', 'drag.js']
    });
});
