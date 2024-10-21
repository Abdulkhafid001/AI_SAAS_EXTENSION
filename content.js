chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeColor") {
    document.body.style.backgroundColor = request.color;
    // Force the color change by setting !important
    document.body.setAttribute(
      "style",
      `background-color: ${request.color} !important`
    );
  }
});
