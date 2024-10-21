document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");
  let isHighlightMode = false;

  toggleButton.addEventListener("click", function () {
    isHighlightMode = !isHighlightMode;
    toggleButton.textContent = isHighlightMode
      ? "Disable Highlight Mode"
      : "Enable Highlight Mode";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighlightMode",
        enable: isHighlightMode,
      });
    });
  });
});
