// document.addEventListener("DOMContentLoaded", function () {
//   const toggleButton = document.getElementById("toggleHighlight");

//   // Get the current state from storage
//   chrome.storage.local.get("highlightMode", function (data) {
//     const isHighlightMode = data.highlightMode || false;
//     updateButtonState(isHighlightMode);
//   });

//   toggleButton.addEventListener("click", function () {
//     chrome.storage.local.get("highlightMode", function (data) {
//       const newState = !data.highlightMode;
//       chrome.storage.local.set({ highlightMode: newState }, function () {
//         updateButtonState(newState);
//         sendMessageToContentScript(newState);
//       });
//     });
//   });

//   function updateButtonState(isHighlightMode) {
//     toggleButton.textContent = isHighlightMode
//       ? "Disable Highlight Mode"
//       : "Enable Highlight Mode";
//   }

//   function sendMessageToContentScript(isHighlightMode) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         action: "toggleHighlightMode",
//         enable: isHighlightMode,
//       });
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");
  let toggleHighLightMode = false;

  toggleButton.addEventListener("click", function () {
    const btnValue = toggleButton.textContent.toString();
    if (btnValue.startsWith("E")) {
      alert("do something!");
      toggleHighLightMode = true;
      updateButtonState(toggleHighLightMode);
      sendMessageToContentScript(toggleHighLightMode);
    } else {
      alert("do nothing");
      updateButtonState(toggleHighLightMode);
    }
  });

  function updateButtonState(toggleHighLightMode) {
    toggleButton.textContent = toggleHighLightMode ? "Enable" : "Disable";
    console.log("called");
    
  }

  function sendMessageToContentScript(isHighLightMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighLightMode",
        enable: isHighLightMode,
      });
    });
  }
});
