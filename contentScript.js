// document.addEventListener('copy', () => {
// 	navigator.clipboard.readText()
// 		.then(res =>  {
// 			chrome.runtime.sendMessage({
// 				message: 'copiedItem',
// 				payload: {copiedItem: `"${res}"`, copiedTime: new Date().getTime()}
// 			});
// 		})
// 		.catch(err => console.log(err))
// });

// function createCopyLineDomEl(copiedText, tabURL) {
//   // create domEls and assign properties to corresponding domEl
//   let newCopyLine = createDomEl("div", "copyline");

//   let text = createDomEl("div", "copied", copiedText);
//   let link = createDomEl("a", "link", tabURL);
//   let timestamp = createDomEl("div", "timestamp", new Date().toDateString());

//   // append parts of the copy line to the copy line DOM el
//   appendChildren([text, link, timestamp], newCopyLine);

//   // append the copy line DOM el to the copy pad
//   copyPadDomEl.appendChild(newCopyLine);
// }

// function createDomEl(type, className, content, timestamp) {
//   // creates type of el
//   let newDomEl = document.createElement(type);
//   // assign class
//   newDomEl.classList.add(className);
//   // if content was not entered as argument, is the containing itemLine div - no text content
//   if (!content) content = "";
//   // otherwise, all divs contain either copied text or the timestamp
//   if (type === "div") newDomEl.textContent = content;
//   // if the type is a link, set the href to be the link
//   else if (type === "a") {
//     newDomEl.setAttribute("href", content);
//     newDomEl.textContent = content;
//   }
//   return newDomEl;
// }

// function appendChildren(arrOfEls, parentEl) {
//   arrOfEls.forEach((domEl) => parentEl.appendChild(domEl));
// }

// document.addEventListener("copy", () => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: () => {
//       document.addEventListener("copy", () => {
//         copiedItem = document.getSelection();
//         copiedItem = copiedItem.toString();
//         createCopyLineDomEl(copiedItem, tab.url);
//       });
//     },
//   });
// });
