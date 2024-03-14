import pandas as pd

def detect_and_report_long_data_values(data, threshold=50):
    # Initialize metrics dictionary to store results
    metrics = {
        'Long data values count per attribute': {},
        'Long data values percentage per attribute': {}
    }

    # Loop through columns to check for long data values
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains string data
            long_values_count = sum(1 for value in data[column] if isinstance(value, str) and len(value) > threshold)
            metrics['Long data values count per attribute'][column] = long_values_count
            total_values = len(data[column])
            if total_values > 0:
                long_values_percentage = (long_values_count / total_values) * 100
            else:
                long_values_percentage = 0
            metrics['Long data values percentage per attribute'][column] = long_values_percentage

    return metrics

# Example usage:
# Assume 'df' is your pandas DataFrame
# metrics = detect_and_report_long_data_values(df, threshold=50)
# print(metrics)
