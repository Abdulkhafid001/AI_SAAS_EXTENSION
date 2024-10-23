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
      if (selectedText) {
        alert(`Selected text: ${selectedText}`);
      }
    }
  });
});
