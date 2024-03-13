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
    plot_unnecessary_distribution(unnecessary_characters)
    return unnecessary_characters

import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt

def plot_unnecessary_distribution(metrics):
    # Plotting the histogram
    fig, ax = plt.subplots(figsize=(10, 6))

    # Extracting keys and values from the metrics dictionary
    chars = list(metrics.keys())
    values = list(metrics.values())

    # Plotting the histogram
    ax.bar(chars, values, color='skyblue')
    ax.set_ylabel('count of unnecessary characters')
    ax.set_xlabel('unnecessary characters')
    ax.set_title('Histogram of Metrics')

   

    # Rotate x-axis labels for better visibility
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    # Save the figure as an image file
    plt.savefig('./histogram_unnecessary.png')