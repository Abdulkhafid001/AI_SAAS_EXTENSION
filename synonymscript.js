// Sample data for synonyms and antonyms
const wordData = {
  quick: { synonyms: ["fast", "speedy"], antonyms: ["slow", "sluggish"] },
  lazy: { synonyms: ["idle", "inactive"], antonyms: ["active", "energetic"] },
  happy: { synonyms: ["joyful", "content"], antonyms: ["sad", "unhappy"] },
  sad: { synonyms: ["unhappy", "sorrowful"], antonyms: ["happy", "joyful"] },
};

// DOM Elements
const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const sentenceInput = document.getElementById("sentence");
const submitSentenceBtn = document.getElementById("submit-sentence");
const adjectivePrompt = document.getElementById("adjective-prompt");
const optionsDiv = document.getElementById("options");
const submitAnswerBtn = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");

let adjectives = [];
let currentAdjectiveIndex = 0;
let correctAnswer = "";

// Extract adjectives from a sentence
function extractAdjectives(sentence) {
  const adjectivesList = ["quick", "lazy", "happy", "sad"]; // Example adjectives
  return sentence
    .split(" ")
    .filter((word) => adjectivesList.includes(word.toLowerCase()));
}

// Display the current adjective and its options
function displayAdjective() {
  if (currentAdjectiveIndex < adjectives.length) {
    const adjective = adjectives[currentAdjectiveIndex];
    const { synonyms, antonyms } = wordData[adjective] || {
      synonyms: [],
      antonyms: [],
    };
    const options = [...synonyms, ...antonyms].sort(() => Math.random() - 0.5);

    adjectivePrompt.textContent = `Choose a synonym or antonym for "${adjective}":`;
    optionsDiv.innerHTML = options
      .map(
        (option) =>
          `<label><input type="radio" name="option" value="${option}">${option}</label><br>`
      )
      .join("");
    submitAnswerBtn.classList.remove("hidden");
    correctAnswer = synonyms[0]; // Correct answer is the first synonym
  } else {
    feedback.textContent = "Game Over! You've completed all adjectives.";
    submitAnswerBtn.classList.add("hidden");
  }
}

// Handle sentence submission
submitSentenceBtn.addEventListener("click", () => {
  const sentence = sentenceInput.value.trim();
  if (sentence) {
    adjectives = extractAdjectives(sentence);
    if (adjectives.length > 0) {
      inputSection.classList.add("hidden");
      gameSection.classList.remove("hidden");
      currentAdjectiveIndex = 0;
      displayAdjective();
    } else {
      feedback.textContent = "No adjectives found in the sentence.";
    }
  }
});

// Handle answer submission
submitAnswerBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    if (userAnswer === correctAnswer) {
      feedback.textContent = "Correct!";
    } else {
      feedback.textContent = `Incorrect. The correct answer is "${correctAnswer}".`;
    }
    currentAdjectiveIndex++;
    setTimeout(() => {
      feedback.textContent = "";
      displayAdjective();
    }, 1500);
  } else {
    feedback.textContent = "Please select an option.";
  }
});
