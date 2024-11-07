// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });

let wordMeaning = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "makeApiRequest") {
    let highlightedWord = message.text;

    getSelectedWordMeaningFromApi(highlightedWord)
      .then((data) => {
        wordMeaning = data;
        saveApiResponseToStorage(wordMeaning);
        sendApiResponseToContentScript(wordMeaning);
        console.log(wordMeaning[0].meanings[0].definitions[0].definition);
        console.log(wordMeaning[0].meanings[0].partOfSpeech);
        console.log(wordMeaning[0].meanings[0].definitions[0].definition);
        console.log(wordMeaning[0].meanings[0].definitions[0].definition);
      })
      .catch((error) => {
        console.error("Error fetching word meaning:", error);
      });
  }
});

async function getSelectedWordMeaningFromApi(highlightedWord) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${highlightedWord}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

function saveApiResponseToStorage(data) {
  chrome.storage.local.set({ wordMeaning: data }).then(() => {
    console.log("Word meaning has been saved!");
  });
}

function sendApiResponseToContentScript(data) {
  chrome.runtime.sendMessage({
    action: "logApiRequest",
    apiResponse: data,
  });
}
