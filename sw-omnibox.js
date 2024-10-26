const CHROME_EXTENSIONS_DOC_URL =
  "https://developer.chrome.com/docs/extensions/reference/";
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  await chrome.omnibox.setDefaultSuggestion({
    description: "Enter a Chrome API or choose from past searches",
  });
  const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
  const suggestions = apiSuggestions.map((api) => {
    return { content: api, description: `Open chrome.${api} API` };
  });
  suggest(suggestions);
});

chrome.omnibox.onInputEntered((input) => {
  chrome.tabs.create({ url: CHROME_EXTENSIONS_DOC_URL + input });
  updateHistory(input);
});

async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  return chrome.storage.local.set({ apiSuggestions });
}
