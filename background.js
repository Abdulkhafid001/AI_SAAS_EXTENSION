chrome.runtime.onInstalled.addListener(() => {
  console.log("Text Highlighter extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "textSelected") {
    console.log("Selected text:", message.text);
  }
});
