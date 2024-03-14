import pandas as pd

def detect_and_report_casing_data_smells(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'Casing inconsistency count per attribute': {},
        'Casing inconsistency percentage per attribute': {}
    }

    # Loop through columns to check for casing inconsistency
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains string data
            unique_values = data[column].unique()
            casing_inconsistency_count = sum(1 for value in unique_values if isinstance(value, str) and (value.lower() != value and value.upper() != value))
            metrics['Casing inconsistency count per attribute'][column] = casing_inconsistency_count
            total_unique_values = len(unique_values)
            if total_unique_values > 0:
                casing_inconsistency_percentage = (casing_inconsistency_count / total_unique_values) * 100
            else:
                casing_inconsistency_percentage = 0
            metrics['Casing inconsistency percentage per attribute'][column] = casing_inconsistency_percentage

    return metrics

# Example usage:
# Assume 'df' is your pandas DataFrame
# metrics = detect_and_report_casing_data_smells(df)
# print(metrics)
