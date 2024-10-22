document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");
  let toggleHighLightMode = false;

  toggleButton.addEventListener("click", function () {
    toggleHighLightMode = !toggleHighLightMode; // Toggle the mode

    // Update button text and state
    toggleButton.textContent = toggleHighLightMode ? "Disable" : "Enable";
    sendMessageToContentScript(toggleHighLightMode);
  });

  function sendMessageToContentScript(isHighLightMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighLightMode",
        enable: isHighLightMode, // Pass the current mode to the content script
      });
    });
  }
});
