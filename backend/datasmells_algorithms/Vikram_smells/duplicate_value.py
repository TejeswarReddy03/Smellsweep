import pandas as pd

def detect_and_report_duplicate_data(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'attributes': [],
        'counts': []
    }

    # Loop through columns to check for duplicate values
    for column in data.columns:
        # Count duplicate values
        duplicate_count_per_attribute = len(data[data.duplicated(subset=[column])][column].value_counts())
        metrics['attributes'].append(column)
        metrics['counts'].append(duplicate_count_per_attribute)
    
    return metrics

# Example usage:
# Assume 'df' is your pandas DataFrame
# metrics = detect_and_report_duplicate_data(df)
# print(metrics)
