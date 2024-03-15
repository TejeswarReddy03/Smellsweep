import pandas as pd

def detect_and_report_suspect_class_values_metrics(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'attributes': [],
        'suspect_count': [],
        'suspect_percentage': [],
        'top_suspect_values': []
    }

    # Define threshold for suspect class values
    suspect_threshold = 5  # Adjust as needed based on your data

    # Loop through columns to check for suspect class values
    for column in data.columns:
        unique_values = data[column].value_counts()
        suspect_values = unique_values[unique_values <= suspect_threshold]

        # Calculate metrics
        suspect_count = len(suspect_values)
        total_count = len(data[column])
        suspect_percentage = (suspect_count / total_count) * 100
        top_suspect_values = suspect_values.index.tolist()

        # Update metrics dictionary
        metrics['attributes'].append(column)
        metrics['suspect_count'].append(suspect_count)
        metrics['suspect_percentage'].append(suspect_percentage)
        metrics['top_suspect_values'].append(top_suspect_values)
   
    return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = detect_and_report_suspect_class_values_metrics(df)
# print(metrics)
