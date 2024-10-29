let vocabularyList = [];
let shownWords = new Set();

// Array of vocabulary file names
const vocabularyFiles = ['N1.json', 'N2.json', 'N3.json', 'N4.json', 'N5.json'];

// Load a random vocabulary file on page load
window.onload = function () {
  // Select a random file from the array
  const randomFile =
    vocabularyFiles[Math.floor(Math.random() * vocabularyFiles.length)];

  // Generate a random button id based on the selected file
  const buttonId = `button-N${randomFile.charAt(1)}`; // Extracts the number for button id

  // Load vocabulary from the random file and highlight the corresponding button
  loadVocabulary(randomFile, buttonId);
};

// Load vocabulary based on selected level
function loadVocabulary(selectedFile, buttonId) {
  // Highlight the selected button
  highlightSelectedButton(buttonId);

  // Reset vocabulary list and shown words tracking
  vocabularyList = [];
  shownWords.clear();
  clearFlashcard(); // Clear flashcard content

  // Fetch the selected JSON file
  fetch(selectedFile)
    .then((response) => response.json())
    .then((data) => {
      vocabularyList = data;
      if (vocabularyList.length > 0) {
        showRandomWord(); // Display the first random word if data is loaded
      } else {
        console.error('No vocabulary data found in the file.');
      }
    })
    .catch((error) => console.error('Error loading JSON:', error));
}

// Highlight the selected button by adding a "selected" class
function highlightSelectedButton(buttonId) {
  // Remove "selected" class from all buttons
  document.querySelectorAll('#level-buttons button').forEach((button) => {
    button.classList.remove('selected');
  });

  // Add "selected" class to the clicked button if it exists
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) {
    selectedButton.classList.add('selected');
  } else {
    console.error(`Button with id ${buttonId} not found.`);
  }
}

// Display a random word that hasn’t been shown yet
function showRandomWord() {
  if (vocabularyList.length === 0) {
    console.error('Vocabulary list is empty. Please select a level first.');
    return;
  }

  if (shownWords.size === vocabularyList.length) {
    alert('All words have been shown!');
    shownWords.clear(); // Reset if all words are shown
  }

  // Select a new random word that hasn't been shown yet
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * vocabularyList.length);
  } while (shownWords.has(randomIndex));

  const word = vocabularyList[randomIndex];
  shownWords.add(randomIndex);

  // Display the selected word on the flashcard
  document.getElementById('vocab').textContent = word.Vocabulary;
  document.getElementById('furigana').textContent = word.Furigana;
  document.getElementById('meaning').textContent = word.Meaning;
}

// Clear flashcard display
function clearFlashcard() {
  document.getElementById('vocab').textContent = '';
  document.getElementById('furigana').textContent = '';
  document.getElementById('meaning').textContent = '';
}
