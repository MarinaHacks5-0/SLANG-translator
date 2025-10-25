
"""
app.py

Flask backend for the GenZ Slang Translator project.
It serves the main web page, handles user input,
translates GenZ slang to normal English (and vice versa),
and optionally uses OpenAI for unknown terms.
"""


from flask import Flask, render_template, request, jsonify
from slang_dict import SLANG_DICT, NORM_DICT, get_meaning
import openai
import os
from flask_livereload import LiveReload




app= Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
LiveReload(app)


openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")

def home():
    """Render the home page."""
    return render_template("index.html")


#to send out translation request to AI
@app.route("/translate", methods=["POST"]) 


def translate():


    data =  request.get_json() #our data coming from get_json


    text = data.get("text", "").strip().lower()

    mode = data.get("mode", "slang_to_normal")



    #Slang to Normal MODE
    if mode == "slang_to_normal":
        if text in SLANG_DICT:
             meaning = SLANG_DICT[text]
             return jsonify({"translation": meaning})

        else: 

            meaning = get_openai_translation(text, direction="slang_to_normal")
            return jsonify({"translation": meaning})


    #Normal to Slang MODE
    elif mode ==  "normal_to_slang" : 

        if text in NORM_DICT:
            
            meaning = NORM_DICT[text]
            return jsonify({"translation": meaning})

        else: 
            meaning = get_openai_translation(text, direction="normal_to_slang")
            return jsonify({"translation": meaning})
        

        

#AI translationnn
def get_openai_translation(text: str, direction: str) -> str:
    """
    Use OpenAI API to find the meaning of unknown slang or create a slang version.

    Args:
        text (str): The text to translate.
        direction (str): 'slang_to_normal' or 'normal_to_slang'.

    Returns:
        str: The AI-generated translation.
    """
    try:
        prompt = ""
        if direction == "slang_to_normal":
            prompt = f"Explain the meaning of the slang term '{text}' in normal English."
        else:
            prompt = f"Convert this normal phrase '{text}' into Gen Z slang."

        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        return response["choices"][0]["message"]["content"].strip()

    except Exception as e:
        return f"Could not find translation. ({str(e)})"


if __name__ == "__main__":
    app.run(debug=True)


                











