chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleHighLightMode") {
    chrome.storage.local.set({ isHighLightMode: request.enable }, function () {
      console.log(`Highlight mode is now: ${request.enable}`);
    });
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "logApiRequest") {
    console.log("time to send ");
  }
});

// When text is selected, check the state from storage
document.addEventListener("mouseup", function () {
  chrome.storage.local.get(["isHighLightMode"], function (result) {
    if (result.isHighLightMode) {
      const selectedText = window.getSelection().toString().trim();
      chrome.runtime.sendMessage({
        action: "makeApiRequest",
        text: selectedText,
      });
      if (selectedText) {
        alert(`Selected text: ${selectedText}`);
      }
    }
  });
});
