# data_refactor.py

import pandas as pd
from spellchecker import SpellChecker

def refactor_misspelling_data_smell(data):
    spell = SpellChecker()

    # Initialize dictionary to store refactored data
    refactored_data = {}

    # Loop through columns
    for column in data.columns:
        # Refactor misspelled values
        refactored_data_column = data[column].copy()  # Copy the column to avoid modifying the original data
        for index, value in enumerate(data[column]):
            corrected_words = []
            words = str(value).split()
            for word in words:
                corrected_word = spell.correction(word)
                if corrected_word is not None:
                    corrected_words.append(corrected_word)
            corrected_value = ' '.join(corrected_words)
            refactored_data_column.at[index] = corrected_value

        refactored_data[column] = refactored_data_column

    # Return refactored data
    return pd.DataFrame(refactored_data)
