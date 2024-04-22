import pandas as pd

def detect_and_report_long_data_values_metrics(data, threshold=50):
    # Initialize metrics dictionary to store results
    metrics = {
        'attributes': [],
        'long_values_count': [],
        'long_values_percentage': []
    }

    # Loop through columns to check for long data values
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains string data
            long_values_count = sum(1 for value in data[column] if isinstance(value, str) and len(value) > threshold)
            total_values = len(data[column])
            long_values_percentage = (long_values_count / total_values) * 100 if total_values > 0 else 0
            
            metrics['attributes'].append(column)
            metrics['long_values_count'].append(long_values_count)
            metrics['long_values_percentage'].append(long_values_percentage)
   
    return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = detect_and_report_long_data_values_metrics(df, threshold=50)
# print(metrics)