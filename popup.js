const copyPadDomEl = document.getElementById("copypad");
const currentCopyPad = [];

function syncCopyPad() {
  // create array of current copy pad by grabbing all child nodes of copy pad DOM el
  const currCopyPad = JSON.stringify(Array.from(copyPadDomEl.children));
  // console.log("current copy pad DOMel: ", currCopyPad);

  // store overwrite previous copy pad in storage w/ current
  // if doesn't exist, create one
  chrome.storage.sync.set({ ["copypad"]: currentCopyPad }, function () {
    // console.log("Saved current copypad.");
  });
}

function getPrevCopyPadFromChromeStorage() {
  clearCopyPad();
  chrome.storage.sync.get(["copypad"], function (resultObj) {
    if (resultObj == undefined) {
      console.log("I am retrieved!");
    } else {
      const prevCopyPad = resultObj["copypad"];
      console.log("retrieved copypad: ", prevCopyPad);
      // console.log("is it an array? ", Array.isArray(prevCopyPad));

      // iterate through each copy line in the previous Copy Pad array
      prevCopyPad.forEach((copyLineObj) => {
        // for each obj (rep. a copy line)

        // assign variable names to the data stored in the arrays inside the copy line array
        // copied text
        const copiedText = copyLineObj.text;
        // link
        const link = copyLineObj.link;
        // timestamp
        const timestamp = copyLineObj.timestamp;

        // create a DOM representation of the copy line
        createCopyLineDomEl(copiedText, link, timestamp);

        // create another JS object of the copy line
        let prevCopyLineObj = createCopyLineObj(copiedText, link, timestamp);
        // push the obj back into the current copy pad JS array
        currentCopyPad.push(prevCopyLineObj);
      });
    }
  });
}

const clrBtn = document.getElementById("clear");
clrBtn.addEventListener("click", () => {
  clearCopyPad();
  clearCopyPadStorage();
});

function clearCopyPad() {
  // clear the DOM
  while (copyPadDomEl.children[0])
    copyPadDomEl.removeChild(copyPadDomEl.lastElementChild);
  // clear the JS array
  while (currentCopyPad[0]) currentCopyPad.pop();
}

function clearCopyPadStorage() {
  // rewrite the storage with the empty array
  chrome.storage.sync.set({ ["copypad"]: [] }, function () {
    console.log("Storage cleared.");
  });
}

let prevBtn = document.getElementById("previous");
prevBtn.addEventListener("click", async () => {
  getPrevCopyPadFromChromeStorage();
});

// ---------------------------------------
let copiedItem = "";
let copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      document.addEventListener("copy", () => {
        copiedItem = document.getSelection();
        copiedItem = copiedItem.toString();
        console.log(copiedItem);
      });
    },
  });

  // if there are 10 items in the list, remove first one
  if (copyPadDomEl.childElementCount >= 10)
    copyPadDomEl.removeChild(copyPadDomEl.firstElementChild);

  // create new copy line with copied text, add to copy pad dom El
  createCopyLineDomEl(
    "You miss 100% of the shots you don't take. -Wayne Gretzky, -Michael Scott",
    tab.url
  );

  // store new copy line in current copy pad JS object
  // if there are 10 items in the list, remove first one
  if (currentCopyPad.length >= 10) {
    let removedCopyLine = currentCopyPad.shift();
  }

  currentCopyPad.push(
    createCopyLineObj(
      "You miss 100% of the shots you don't take. -Wayne Gretzky, -Michael Scott",
      tab.url
    )
  );
  // console.log("your current JS copypad: ", currentCopyPad);
  syncCopyPad();
});

function createCopyLineObj(
  copiedText,
  tabURL,
  timestamp = new Date().toDateString()
) {
  // create properties for storage in JS object
  const newCopyLineObj = {};
  newCopyLineObj.domElType = "div";
  newCopyLineObj.className = "copyline";
  newCopyLineObj.text = copiedText;
  newCopyLineObj.link = tabURL;
  // if timestamp isn't passed in
  newCopyLineObj.timestamp = timestamp;

  // return the new copy line
  return newCopyLineObj;
}

function createCopyLineDomEl(copiedText, tabURL) {
  // create domEls and assign properties to corresponding domEl
  let newCopyLine = createDomEl("div", "copyline");

  let text = createDomEl("div", "copied", copiedText);
  let link = createDomEl("a", "link", tabURL);
  let timestamp = createDomEl("div", "timestamp", new Date().toDateString());

  // append parts of the copy line to the copy line DOM el
  appendChildren([text, link, timestamp], newCopyLine);

  // append the copy line DOM el to the copy pad
  copyPadDomEl.appendChild(newCopyLine);
}

function createDomEl(type, className, content, timestamp) {
  // creates type of el
  let newDomEl = document.createElement(type);
  // assign class
  newDomEl.classList.add(className);
  // if content was not entered as argument, is the containing itemLine div - no text content
  if (!content) content = "";
  // otherwise, all divs contain either copied text or the timestamp
  if (type === "div") newDomEl.textContent = content;
  // if the type is a link, set the href to be the link
  else if (type === "a") {
    newDomEl.setAttribute("href", content);
    newDomEl.textContent = content;
  }
  return newDomEl;
}

function appendChildren(arrOfEls, parentEl) {
  arrOfEls.forEach((domEl) => parentEl.appendChild(domEl));
}

getPrevCopyPadFromChromeStorage();

// ---------------------------------------

// need to make tab listen for a copy event

function copySelected() {
  let selected = window.getSelection();
  // selected = selected.text;
  console.log("selection copied", selected);
  // let selection = document.getSelection().toString();
  // console.log(selection);
}
