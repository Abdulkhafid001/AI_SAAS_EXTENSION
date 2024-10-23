import { apiKey } from "./keys";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Text Highlighter extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getApiKey");
  sendResponse(apiKey);
});

let lastSelectedText = "";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "textSelected") {
    lastSelectedText = request.text;
    console.log(
      `lastSelectedText: ${lastSelectedText} from background.js file send request to API!`
    );
  }
});
