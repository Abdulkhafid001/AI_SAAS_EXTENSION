// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "makeApiRequest") {
    let selectedWord = message.text;
    getSelectedWordMeaningFromApi(selectedWord);
    console.log(getSelectedWordMeaningFromApi(selectedWord));

    sendMessageToContentScript(selectedWord);
  }
});

function getSelectedWordMeaningFromApi(selectedWord) {
  let wordMeaning = {};
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`;
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
      console.log("Data received:", data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return wordMeaning;
}

function sendMessageToContentScript(selectedWord) {
  chrome.runtime.sendMessage({
    action: "logApiRequest",
    apiResponse: getSelectedWordMeaningFromApi(selectedWord),
  });
}
