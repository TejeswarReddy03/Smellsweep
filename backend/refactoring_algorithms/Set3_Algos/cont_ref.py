# import pandas as pd
# import re

# def detect_and_refactor_contractions(df):
#     if df.empty:
#         raise ValueError("DataFrame is empty.")

#     contraction_pattern = re.compile(r"\b(?:\w+(?:['’])\w*?)\b")  # Updated regex pattern to detect contractions

#     df_refactored = df.copy()  # Make a copy to ensure the original DataFrame remains unchanged

#     for column in df.columns:
#         if df[column].dtype == 'O':
#             df_refactored[column] = df_refactored[column].apply(lambda text: refactor_contractions(text))

#     # return df_refactored.to_json(orient='records')

#     return df_refactored

import pandas as pd
import re

def detect_and_refactor_contractions(df):
    if df.empty:
        raise ValueError("DataFrame is empty.")

    contraction_expansions = {
        "aren't": "are not",
        "can't": "cannot",
        "could've": "could have",
        "couldn't": "could not",
        "didn't": "did not",
        "doesn't": "does not",
        "don't": "do not",
        "hadn't": "had not",
        "hasn't": "has not",
        "haven't": "have not",
        "he'd": "he would",
        "he'll": "he will",
        "he's": "he is",
        "I'd": "I would",
        "I'll": "I will",
        "I'm": "I am",
        "I've": "I have",
        "isn't": "is not",
        "it's": "it is",
        "let's": "let us",
        "mightn't": "might not",
        "mustn't": "must not",
        "shan't": "shall not",
        "she'd": "she would",
        "she'll": "she will",
        "she's": "she is",
        "should've": "should have",
        "shouldn't": "should not",
        "that's": "that is",
        "there's": "there is",
        "they'd": "they would",
        "they'll": "they will",
        "they're": "they are",
        "they've": "they have",
        "wasn't": "was not",
        "we'd": "we would",
        "we'll": "we will",
        "we're": "we are",
        "we've": "we have",
        "weren't": "were not",
        "what'll": "what will",
        "what're": "what are",
        "what's": "what is",
        "what've": "what have",
        "where's": "where is",
        "who'd": "who would",
        "who'll": "who will",
        "who're": "who are",
        "who's": "who is",
        "who've": "who have",
        "won't": "will not",
        "wouldn't": "would not",
        "you'd": "you would",
        "you'll": "you will",
        "you're": "you are",
        "you've": "you have",
        "y'all": "you all",
        "could'nt": "could not"
    }

    df_refactored = df.copy()  # Make a copy to ensure the original DataFrame remains unchanged

    for column in df.columns:
        if df[column].dtype == 'O':
            for contraction, expansion in contraction_expansions.items():
                df_refactored[column] = df_refactored[column].str.replace(contraction, expansion)

    return df_refactored

# Example usage:
# if __name__ == "__main__":
#     df = pd.DataFrame({'Text': ["I can't believe I couldn't make it", "It's a beautiful day"]})
#     df_refactored = refactor_contractions(df)
#     print(df_refactored)
