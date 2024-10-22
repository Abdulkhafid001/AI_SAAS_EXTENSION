// let isHighLightMode = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleHighLightMode") {
    // isHighLightMode = request.enable;
    console.log(`isHighLightMode: ${isHighLightMode}`);
  }
});

document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    alert(`Selected text: ${selectedText}`);
  }
});
