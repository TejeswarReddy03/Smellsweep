import pandas as pd
import string
from collections import defaultdict

def detect_and_analyze_unnecessary_characters(dataframe):
    # Display the original DataFrame
   

    # Detect and analyze unnecessary characters
    unnecessary_characters = detect_and_clean_unnecessary_characters(dataframe)

    return unnecessary_characters

def detect_and_clean_unnecessary_characters(dataframe):
    unnecessary_characters = defaultdict(int)

    # Create a copy of the original DataFrame for cleaning
    cleaned_dataframe = dataframe.copy()

    # Iterate through each cell in the DataFrame
    for col in dataframe.columns:
        for index, value in dataframe[col].items():
            if isinstance(value, str):
                # Detect unnecessary characters (non-alphanumeric and non-whitespace)
                detected_chars = set(char for char in value if char not in string.ascii_letters + string.digits + string.whitespace)
                
                # Check for unnecessary characters
                if detected_chars:
                    for char in detected_chars:
                        unnecessary_characters[char] += 1

                    # Remove unnecessary characters from the copy of the DataFrame
                    cleaned_value = ''.join(char for char in value if char in string.ascii_letters + string.digits + string.whitespace)
                    cleaned_dataframe.at[index, col] = cleaned_value

    return unnecessary_characters

# Example usage