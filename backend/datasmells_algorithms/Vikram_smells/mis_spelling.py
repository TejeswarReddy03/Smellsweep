import pandas as pd
import re

def detect_misspelling_data_smell_metrics(data):
    # Initialize metrics dictionary to store results
    misspelled_values_per_attribute = {}

    # Loop through columns to check for misspelled values
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains strings
            misspelled_values = [value for value in data[column] if re.search(r'[^A-Za-z0-9\s.]+', str(value))]
            misspelled_values_per_attribute[column] = misspelled_values

    num_misspelled_values = sum(len(misspelled_values) for misspelled_values in misspelled_values_per_attribute.values())

    return num_misspelled_values, misspelled_values_per_attribute

# Example usage:
# Assume 'df' is your DataFrame
# num_misspelled_values, misspelled_values_per_attribute = detect_misspelling_data_smell_metrics(df)
# print(num_misspelled_values)
# print(misspelled_values_per_attribute)
