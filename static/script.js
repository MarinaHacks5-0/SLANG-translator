
// ============================================
// 1. Get elements: input field, buttons, output box
// ============================================

// ⬇️ Updated to match your HTML IDs ⬇️
const input = document.getElementById("inputText");
const output = document.getElementById("outputPane");
const translateBtn = document.getElementById("translate-pill");
const englishBtn = document.getElementById("english-pill");
const genzBtn = document.getElementById("genz-pill");
const resetBtn = document.getElementById("reset-pill");

// Default translation direction: Gen Z → English
let currentDirection = "genz_to_english";

// ============================================
// 2. Add event listeners
// ============================================

// English → Gen Z
genzBtn.addEventListener("click", () => {
  currentDirection = "english_to_genz";
  highlightMode(genzBtn);
  output.textContent = "Mode: English → Gen Z slang";
});

// Gen Z → English
englishBtn.addEventListener("click", () => {
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
  output.textContent = "Mode: Gen Z slang → English";
});

// Translate button
translateBtn.addEventListener("click", handleTranslate);

// Reset button
resetBtn.addEventListener("click", () => {
  input.value = "";
  output.textContent = "";
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
  output.textContent = "Mode: Gen Z slang → English";
});

// ============================================
// 3. Translation logic (Fetch request to Flask)
// ============================================

async function handleTranslate() {
  const text = input.value.trim();
  if (!text) {
    output.textContent = "Please enter text to translate!";
    return;
  }
  await translateText(text, currentDirection);
}

async function translateText(text, direction) {
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
// 4. Utility: Highlight active button
// ============================================

function highlightMode(activeBtn) {
  [englishBtn, genzBtn].forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// ============================================
// 5. Initialize default mode on page load
// ============================================

highlightMode(englishBtn);
output.textContent = "Mode: Gen Z slang → English";


