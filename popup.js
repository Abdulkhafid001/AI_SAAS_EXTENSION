document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");

  // Initialize button text based on stored value
  chrome.storage.local.get(["isHighLightMode"], function (result) {
    const isHighLightMode = result.isHighLightMode || false;
    toggleButton.textContent = isHighLightMode ? "Disable" : "Enable";
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get(["isHighLightMode"], function (result) {
      const isHighLightMode = !(result.isHighLightMode || false); // Toggle the mode
      toggleButton.textContent = isHighLightMode ? "Disable" : "Enable";

      // Send the new state to the content script
      sendMessageToContentScript(isHighLightMode);
    });
  });

  function sendMessageToContentScript(isHighLightMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighLightMode",
        enable: isHighLightMode,
      });
    });
  }
});

function displayWordMeaning() {
  let paragraph = document.getElementById("result").firstChild();
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "logApiRequest") {
      chrome.storage.local.get(["wordMeaning"]).then((result) => {
        console.log("Value is " + result.key);
      });
    }
  });
}
