// ============================================
// 1. Get elements: input field, buttons, output box
// - Select and store references to the HTML elements so JS can read/update them.
// - These elements include: input field, translate button, English & Gen Z mode buttons, reset button, and output area.
// ============================================

const input = document.getElementById("inputText");
const output = document.getElementById("outputPane");
const translateBtn = document.getElementById("translate-pill");
const englishBtn = document.getElementById("btn-slang-to-normal");
const genzBtn = document.getElementById("btn-normal-to-slang");
const resetBtn = document.getElementById("btn-reset");

// Default translation direction: Gen Z → English
let currentDirection = "genz_to_english";


// ============================================
// 2. Add event listeners
// - Detect when the user clicks on:
//   English Description button → sets mode: Gen Z slang → English
//   Gen Z Slang button → sets mode: English → Gen Z slang
//   Translate button → sends text to Flask for translation based on current mode
//   Reset button → clears input/output and resets to default (Gen Z → English)
// ============================================

// Gen Z Slang button → English → Gen Z
genzBtn.addEventListener("click", () => {
  currentDirection = "english_to_genz";
  highlightMode(genzBtn);
  output.textContent = "Mode: English → Gen Z slang";
});

// 💀 English Description button → Gen Z → English
englishBtn.addEventListener("click", () => {
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
  output.textContent = "Mode: Gen Z slang → English";
});

// ⚡ Translate button → performs translation
translateBtn.addEventListener("click", handleTranslate);

// 🔁 Reset button → clears and resets mode
resetBtn.addEventListener("click", () => {
  input.value = "";
  output.textContent = "";
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
});


// ============================================
// 3. Fetch API call to /translate (Flask route)
// - When the translate button is clicked, send a POST request to the Flask backend.
// - Include JSON data with:
//     { text: userInput, direction: "genz_to_english" or "english_to_genz" }
// ============================================

// Perform translation based on selected mode
async function handleTranslate() {
  const text = input.value.trim();
  if (!text) {
    output.textContent = "Please enter text to translate!";
    return;
  }
  await translateText(text, currentDirection);
}


// ============================================
// 4. Handle JSON response
// - Wait for the Flask server to respond with a JSON object containing the translation.
// - Extract the translated text and display it in the output box.
// - If no translation or error occurs, show a helpful error message instead.
// ============================================

async function translateText(text, direction) {
  // ============================================
  // 5. (Optional) Loading feedback
  // - While waiting for a response, display a short message (e.g., "Translating...⏳").
  // - Replace the loading message with the translated result once received.
  // ============================================

  output.textContent = "Translating...⏳";

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, direction }),
    });

    const data = await response.json();
    output.textContent = data.translation || "No translation found.";
  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Something went wrong. Please try again.";
  }
}


// ============================================
// Utility Function: Highlight Active Mode Button
// - Adds a visual indicator for which mode is currently active.
// ============================================

function highlightMode(activeBtn) {
  [englishBtn, genzBtn].forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}


// ============================================
// Initialize default mode on page load
// - Highlight the English Description button and show the default mode message.
// ============================================

highlightMode(englishBtn);
output.textContent = " ";
