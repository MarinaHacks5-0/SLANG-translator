

//🧠 What You’ll Include in script.js
//Here’s what you’ll be implementing conceptually (not code yet):

//Get elements: input field, translate button, and output box.
const input = document.getElementById("inputText");
const translate = document.getElementById("translateButton"); //if clicked on: the "translate to" destination(arrow) should switch directions (i.e genz ---> english & genz <---- english)
const reset = document.getElementById("resetButton");
const output = document.getElementById("outputBox");

// Keep track of translation direction (default: Gen Z → English)
let isGenZToEnglish = true;

//Add event listeners to detect when the button is clicked.
button.addEventListener('click',handleTranslate);

//Add event listeners to detect when the button is clicked.
button.addEventListener('click',handleTranslate);("dblclick", () => { 
    isGenZToEnglish = ! isGenZToEnglish;
    translate.textContent

}
//to toggle the direction of the arrow on the translate button when clicked again.
fetch('')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));


//Handle JSON response to display the translation result.

//(Optional) Show a small loading spinner or text while waiting.