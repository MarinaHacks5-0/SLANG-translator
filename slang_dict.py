SLANG_DICT = {
    "cap": "lie or falsehood",
    "no cap": "for real or truly",
    "bet": "okay, sure, or deal",
    "sus": "suspicious or sketchy",
    "slaps": "is really good or amazing (usually for music)",
    "rizz": "charisma or ability to attract someone romantically",
    "drip": "stylish outfit or appearance",
    "yeet": "to throw something with force or excitement",
    "bussin": "really good or delicious (usually about food)",
    "ghosted": "suddenly stopped communicating with someone"
}

NORM_DICT = {
    "lie": "cap",
    "truth": "no cap",
    "okay": "bet",
    "suspicious": "sus",
    "amazing": "slaps",
    "charisma": "rizz",
    "stylish": "drip",
    "throw": "yeet",
    "delicious": "bussin",
    "ignored": "ghosted"
}

def get_meaning(word, direction="slang_to_normal"):
    if direction == "slang_to_normal":
        return SLANG_DICT.get(word, "No meaning found.")
    else:
        return NORM_DICT.get(word, "No slang found.")

