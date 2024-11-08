document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleHighlight");

  // Initialize button text based on stored value
  chrome.storage.local.get(["isHighLightMode"], function (result) {
    const isHighLightMode = result.isHighLightMode || false;
    toggleButton.textContent = isHighLightMode ? "Disable" : "Enable";
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get(["isHighLightMode"], function (result) {
      const isHighLightMode = !(result.isHighLightMode || false); // Toggle the mode
      toggleButton.textContent = isHighLightMode ? "Disable" : "Enable";

      // Send the new state to the content script
      sendMessageToContentScript(isHighLightMode);
    });
  });

  function sendMessageToContentScript(isHighLightMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleHighLightMode",
        enable: isHighLightMode,
      });
    });
  }
  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      const word = request.word;
      await fetchDefinitionFromAPI(word);
    }
  );
  displayDefinition();
});

async function fetchDefinitionFromAPI(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    const definition =
      data[0]?.meanings[0]?.definitions[0]?.definition ||
      "Definition not found.";
    saveWordMeaningToStorage(word, definition);
  } catch (error) {
    console.error("Error fetching definition:", error);
  }
}

function saveWordMeaningToStorage(word, definition) {
  chrome.storage.local.set({ wordMeaning: { word, definition } }, function () {
    console.log("Word and meaning saved!");
  });
}

function displayDefinition() {
  chrome.storage.local.get(["wordMeaning"], function (result) {
    const { word, definition } = result.wordMeaning || {};
    if (word && definition) {
      document.getElementById("word").innerText = word;
      document.getElementById("definition").innerText = definition;
    } else {
      document.getElementById("word").innerText = "No word selected.";
      document.getElementById("definition").innerText =
        "Please select a word to see its meaning.";
    }
  });
}
