chrome.runtime.onInstalled.addListener(() => {
  console.log("Text Highlighter extension installed");
  // chrome.storage.local.set({ highlightMode: false }, function () {
  //   console.log("Highlight mode initialized to false");
  // });
});
