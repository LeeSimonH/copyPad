let copiedItem = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (/^http/.test(tab.url) && changeInfo.status === "complete") {
    chrome.tabs.executeScript(tabId, { file: "./contentScript.js" });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "copiedItem") {
    console.log(request.payload.copiedItem);
    copiedItem = request.payload.copiedItem;
    // assign copied item to latest stored object in storage
    console.log(copiedItem);
  }
});

// ----------------------
