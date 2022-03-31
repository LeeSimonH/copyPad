// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// //
// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

// EVERYTHING ABOVE THIS IS FROM THE GOOGLE TUTORIAL

// TEST ------

const copyPad = document.getElementById("copypad");
let copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", async () => {
  // if there are 10 items in the list, remove one
  if (copyPad.childElementCount >= 10)
    copyPad.removeChild(copyPad.firstElementChild);

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("tab:", tab);
  console.log(tab.url);

  let newCopyLine = createDomEl("div", "copyline");

  let copiedText = createDomEl("div", "copied", "This text was copied");
  newCopyLine.appendChild(copiedText);

  let link = createDomEl("a", "link", tab.url);
  link.setAttribute("href", tab.url);
  newCopyLine.appendChild(link);

  let timestamp = createDomEl("div", "timestamp", new Date().toDateString());
  newCopyLine.appendChild(timestamp);

  copyPad.appendChild(newCopyLine);
  // copyPad.textContent = tab.url;

  // console.log("clicked");
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: addToCopyPad.bind(this.target.tabId),
  // });
});

function addToCopyPad() {
  const selection = document.getSelection();
  console.log(selection);
  new CopyLine(selection);
}
// TEST ------

// EVERYTHING ABOVE THIS IS FROM THE GOOGLE TUTORIAL

// const copyPad = document.getElementById("copypad");

// when you copy something, it adds it to the copypad

// make page listen for a copy event
document.addEventListener("copy", (event) => {
  // get the highlighted stuff
  const selection = document.getSelection();

  // add what's highlighted to the copyPad
  // create a new dom element
  // add what's highlighted to dom element
  // append element to copypad

  // if there are already 10 things in the copy pad, delete one thing
  // if (10thing) delete thing
  new CopyLine(selection);
  // event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
  // event.preventDefault();

  // *STRETCH -
  // include URL/link to the current page
  // timestamp (time, date)
});

class CopyLine {
  constructor(copiedText) {
    this.copiedText = copiedText;

    let newCopyLine = createDomEl("div", "copyline");

    let text = createDomEl("div", "copied", this.copiedText);
    newCopyLine.appendChild(text);

    let link = createDomEl("div", "link", copiedText);
    newCopyLine.appendChild(link);

    let timestamp = createDomEl("div", "timestamp");

    // append newly created line (w/ copied text, link, and timestamp) to the copypad
    copyPad.appendChild(newCopyLine);
  }

  // this is a helper function to create new dom elements
  createDomEl(type, className, content) {
    if (!content) content = "";
    let newDomEl = document.createElement(type);
    newDomEl.classList.add(className);
    newDomEl.textContent = content;
    return newDomEl;
  }
}

function createDomEl(type, className, content) {
  if (!content) content = "";
  let newDomEl = document.createElement(type);
  newDomEl.classList.add(className);
  newDomEl.textContent = content;
  return newDomEl;
}

// when clicking the extension, brings up the entire copypad
// contains everything (the past 10 things) you've copied
