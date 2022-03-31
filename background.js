chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ copypad });
});

// ----------------------

chrome.windows.chrome.contextMenus.create({
  id: "copyPad",
  title: "CopyPad",
  contexts: ["selection"],
});

chrome.tabs.onCreated.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: function () {
      document.addEventListener("copy", () => {
        let selection = document.getSelection();
        console.log(selection);
      });
    },
    tabId,
  });
});

// ----------------------
