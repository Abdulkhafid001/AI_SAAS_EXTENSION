chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleHighLightMode") {
    chrome.storage.local.set({ isHighLightMode: request.enable }, function () {
      console.log(`Highlight mode is now: ${request.enable}`);
    });
  }
});

// When text is selected, check the state from storage
document.addEventListener("mouseup", function () {
  chrome.storage.local.get(["isHighLightMode"], function (result) {
    if (result.isHighLightMode) {
      const selectedText = window.getSelection().toString().trim();
      chrome.runtime.sendMessage({
        action: "textSelected",
        text: selectedText,
      });
      if (selectedText) {
        alert(`Selected text: ${selectedText}`);
      }
    }
  });
});

const article = document.querySelector("body");
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  console.log("word in page: " + readingTime);

  const badge = document.createElement("p");
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
