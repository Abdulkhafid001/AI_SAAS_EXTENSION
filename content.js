let isHighLightMode = false;

// Listen for messages from the background or popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleHighLightMode") {
    isHighLightMode = request.enable; // Update highlight mode
    console.log(`Highlight mode is now: ${isHighLightMode}`);
  }
});

// Capture highlighted text when mouse button is released
document.addEventListener("mouseup", function () {
  if (isHighLightMode) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      alert(`Selected text: ${selectedText}`);
    }
  }
});
