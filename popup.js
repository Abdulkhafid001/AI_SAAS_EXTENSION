document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");

  // Get the current state from storage
  chrome.storage.local.get("highlightMode", function (data) {
    const isHighlightMode = data.highlightMode || false;
    updateButtonState(isHighlightMode);
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get("highlightMode", function (data) {
      const newState = !data.highlightMode;
      chrome.storage.local.set({ highlightMode: newState }, function () {
        updateButtonState(newState);
        sendMessageToContentScript(newState);
      });
    });
  });

  function updateButtonState(isHighlightMode) {
    toggleButton.textContent = isHighlightMode
      ? "Disable Highlight Mode"
      : "Enable Highlight Mode";
  }

  function sendMessageToContentScript(isHighlightMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighlightMode",
        enable: isHighlightMode,
      });
    });
  }
});
