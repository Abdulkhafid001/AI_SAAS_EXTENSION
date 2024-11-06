// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });

let wordMeaning = {};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "makeApiRequest") {
    let highlightedWord = message.text;
    wordMeaning = getSelectedWordMeaningFromApi(highlightedWord);
    saveApiResponseToStorage();
    sendApiResponseToContentScript();
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
  chrome.storage.local.set({ wordMeaning: wordMeaning }).then(() => {
    console.log("word meaning has been saved!");
  });
}

function sendApiResponseToContentScript() {
  chrome.runtime.sendMessage({
    action: "logApiRequest",
    apiResponse: wordMeaning,
  });
}
