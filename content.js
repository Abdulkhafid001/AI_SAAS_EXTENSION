let isHighlightMode = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleHighlightMode") {
    isHighlightMode = request.enable;
  }
});

document.addEventListener("mouseup", function () {
  if (isHighlightMode) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      alert(`Selected text: ${selectedText}`);
    }
  }
});
