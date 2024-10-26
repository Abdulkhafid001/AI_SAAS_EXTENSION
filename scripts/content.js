// chrome.runtime.onMessage.addListener((request) => {
//   if (request.action === "toggleHighLightMode") {
//     chrome.storage.local.set({ isHighLightMode: request.enable }, function () {
//       console.log(`Highlight mode is now: ${request.enable}`);
//     });
//   }
// });

// // When text is selected, check the state from storage
// document.addEventListener("mouseup", function () {
//   chrome.storage.local.get(["isHighLightMode"], function (result) {
//     if (result.isHighLightMode) {
//       const selectedText = window.getSelection().toString().trim();
//       chrome.runtime.sendMessage({
//         action: "textSelected",
//         text: selectedText,
//       });
//       if (selectedText) {
//         alert(`Selected text: ${selectedText}`);
//       }
//     }
//   });
// });

// const article = document.querySelector("body");
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g;
//   const words = text.matchAll(wordMatchRegExp);
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   console.log("word in page: " + readingTime);

//   const badge = document.createElement("p");
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

(async () => {
  const { tip } = await chrome.runtime.sendMessage({ greeting: "tip" });

  const nav = document.querySelector(".upper-tabs > nav");

  const tipWidget = createDomElement(`
    <button type="button" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0 12px; height: 36px;">
      <span style="display: block; font: var(--devsite-link-font,500 14px/20px var(--devsite-primary-font-family));">Tip</span>
    </button>
  `);

  const popover = createDomElement(
    `<div id='tip-popover' popover style="margin: auto;">${tip}</div>`
  );

  document.body.append(popover);
  nav.append(tipWidget);
})();

function createDomElement(html) {
  const dom = new DOMParser().parseFromString(html, "text/html");
  return dom.body.firstElementChild;
}


