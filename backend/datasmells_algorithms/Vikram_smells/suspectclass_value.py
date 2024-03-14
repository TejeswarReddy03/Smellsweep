import pandas as pd

def detect_and_report_suspect_class_values(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'Number of suspect class values per attribute': {},
        'Percentage of suspect class values per attribute': {},
        'Top suspect class values per attribute': {}
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
        metrics['Number of suspect class values per attribute'][column] = suspect_count
        metrics['Percentage of suspect class values per attribute'][column] = suspect_percentage
        metrics['Top suspect class values per attribute'][column] = top_suspect_values

    return metrics

# Example usage:
# Load your data into a DataFrame named 'data'
# suspect_class_values_metrics = detect_and_report_suspect_class_values(data)
