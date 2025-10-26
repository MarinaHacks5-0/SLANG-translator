// ============================================
// 1. Get elements: input field, buttons, output box
// ============================================

const input = document.getElementById("inputText");           // input box
const output = document.getElementById("outputText");        // output display
const translateBtn = document.getElementById("translate-pill"); // Translate button
const englishBtn = document.getElementById("btn-slang-to-normal"); // Gen Z → English
const genzBtn = document.getElementById("btn-normal-to-slang");   // English → Gen Z
const resetBtn = document.getElementById("btn-reset");           // Reset button

// Default translation direction: Gen Z → English
let currentDirection = "genz_to_english";



document.addEventListener("DOMContentLoaded", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById("micBtn");
  const inputBox = document.getElementById("inputText");

  if (!SpeechRecognition) {
    micBtn.disabled = true;
    micBtn.textContent = "Not supported";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";         // set language
  recognition.continuous = false;     // stop after one sentence
  recognition.interimResults = true;  // show words as you speak

  let finalTranscript = "";

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }
    inputBox.value = finalTranscript + interimTranscript;
  };

  recognition.onend = () => {
    micBtn.textContent = "🎙️ Start";
  };

  micBtn.addEventListener("click", () => {
    if (micBtn.textContent.includes("Start")) {
      finalTranscript = "";
      recognition.start();
      micBtn.textContent = "⏹️ Stop";
    } else {
      recognition.stop();
      micBtn.textContent = "🎙️ Start";
    }
  });
});

// ============================================
// 2. Mode buttons: switch translation direction
// ============================================
englishBtn.addEventListener("click", () => {
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
  output.textContent = "Your Slang";
});

genzBtn.addEventListener("click", () => {
  currentDirection = "english_to_genz";
  highlightMode(genzBtn);
  output.textContent = "English";
});

// ============================================
// 3. Translate button
// ============================================

translateBtn.addEventListener("click", handleTranslate);

function handleTranslate() {
  const text = input.value.trim();

  if (!text) {
    output.textContent = "Please enter some text!";
    return;
  }

  translateText(text, currentDirection);
}

// ============================================
// 4. Reset button
// ============================================

resetBtn.addEventListener("click", () => {
  input.value = "";
  currentDirection = "genz_to_english";
  highlightMode(englishBtn);
  output.textContent = "Mode: Gen Z slang → English";
});

// ============================================
// 5. Translation logic (Fetch request to Flask)
// ============================================

async function translateText(text, direction) {
  output.textContent = "Translating...⏳";

  try {
    // Map JS direction to Flask mode
  const mode = currentDirection === "genz_to_english" ? "slang_to_normal" : "normal_to_slang";

  const response = await fetch("/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, mode }),
  })

    const data = await response.json();
    output.textContent = data.translation || "No translation found.";

  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Something went wrong. Please try again.";
  }
}

// ============================================
// 6. Highlight active mode button
// ============================================

function highlightMode(activeBtn) {
  [englishBtn, genzBtn].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// ============================================
// 7. Initialize default mode on page load
// ============================================

highlightMode(englishBtn);
output.textContent = "Translation will appear here...";
