import pandas as pd
import re

def detect_misspelling_data_smell(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'Number of misspelled values': 0,
        'Misspelled examples per attribute': {}
    }

    # Loop through columns to check for misspelled values
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains strings
            misspelled_values = []
            misspelled_count = 0

            # Iterate over each value in the column
            for value in data[column]:
                # Perform misspelling detection logic
                # Updated regex pattern to allow spaces and periods
                if re.search(r'[^A-Za-z0-9\s.]+', str(value)):
                    misspelled_values.append(value)
                    misspelled_count += 1

            metrics['Number of misspelled values'] += misspelled_count
            metrics['Misspelled examples per attribute'][column] = misspelled_values

    return metrics

# Example usage:
# Assuming 'data' is your DataFrame
# misspelling_metrics = detect_misspelling_data_smell(data)
# print(misspelling_metrics)
