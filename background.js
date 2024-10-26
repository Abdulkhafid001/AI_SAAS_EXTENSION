// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "textSelected") {
//     console.log("Selected text:", message.text);
//   }
// });

// const extensions = "https://developer.chrome.com/docs/extensions";
// const djangodocs = "https://docs.djangoproject.com/en/5.1/";

// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(extensions) || tab.url.startsWith(djangodocs)) {
//     const previousState = await chrome.action.getBadgeText({ tabId: tab.id });

//     const nextState = previousState === "ON" ? "OFF" : "ON";

//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });

//     if (nextState === "ON") {
//       chrome.scripting.insertCSS({
//         files: ["focus_mode.css"],
//         target: { tabId: tab.id },
//       });
//     } else if (nextState === "OFF") {
//       chrome.scripting.removeCSS({
//         files: ["focus_mode.css"],
//         target: { tabId: tab.id },
//       });
//     }
//   }
// });


import './sw-omnibox.js';
import './sw-tips.js';