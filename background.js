// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "makeApiRequest") {
    let highlightedWord = message.text;
    sendApiResponseToContentScript(highlightedWord);
  }
});



function getSelectedWordMeaningFromApi(highlightedWord) {
  let wordMeaning = {};
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${highlightedWord}`;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      wordMeaning = data;
      console.log("Data received:", wordMeaning);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return wordMeaning;
}

function saveApiResponseToStorage() {
  chrome.storage.local
    .set({ wordMeaning: getSelectedWordMeaningFromApi(highlightedWord) })
    .then(() => {
      console.log("value was set");
    });
}

function sendApiResponseToContentScript(highlightedWord) {
  chrome.runtime.sendMessage({
    action: "logApiRequest",
    apiResponse: getSelectedWordMeaningFromApi(highlightedWord),
  });
}
