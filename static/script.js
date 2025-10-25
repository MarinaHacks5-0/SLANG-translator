

//What You’ll Include in script.js
//Here’s what you’ll be implementing conceptually (not code yet):

//Get elements: input field, translate button, and output box.
//grabs the HTML elements by ID so the js can interact with it
const input = document.getElementById("inputText");
const translate = document.getElementById("translateButton"); //if clicked on: the "translate to" destination(arrow) should switch directions (i.e genz ---> english & genz <---- english)
const reset = document.getElementById("resetButton");
const output = document.getElementById("outputBox");

// Keep track of translation direction (default: Gen Z → English)
let isGenZToEnglish = true;

//Add event listeners to detect when the button is clicked.
translate.addEventListener('click',handleTranslate);

//To toggle the direction of the arrow on the translate button when clicked again.
translate.addEventListener('click',handleTranslate);("dblclick", () => { 
    isGenZToEnglish = ! isGenZToEnglish;
    translate.textContent = isGenZToEnglish
        ? "Gen Z to English"
        : "English to Gen Z";
});

//Reset button Clears input and output. 
reset.addEventListener('click', () => { 
    input.value = " ";
    output.textContent = " ";
});

//Fetch API call to /translate (Flask route).
async function handleTranslate() {
  const text = input.value.trim();
  if (!text) {
    output.textContent = "Please enter text to translate!";
    return;
  }
  await translateText(text);
}

//Handle JSON response to display the translation result
const data = await response.json(); 
  //Handle JSON response to display the translation result.
try 
{
  const data = await response.json();
  output.textContent = data.translation || "No translation found.";
} catch (error) {
  console.error("Error:", error);
  output.textContent = "Something went wrong. Please try again.";
}


//(Optional) Show a small loading spinner or text while waiting.(ex.Translating...;)
async function translateText(text) {
  output.textContent = "Translating...⏳";
  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        direction: isGenZToEnglish ? "genz_to_english" : "english_to_genz",
      }),
    });

    const data = await response.json();
    output.textContent = data.translation || "No translation found.";
  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Something went wrong. Please try again.";
  }
}

