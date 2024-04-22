import pandas as pd

def refactor_long_data_values(data, threshold=50):
    # Initialize metrics dictionary to store results
    metrics = {
        'attribute': [],  # Change 'attributes' to 'attribute' to match the structure expected by Recharts
        'long_values_count': [],  # Change 'long_values_count' to 'count' to match the structure expected by Recharts
        'long_values_percentage': [],  # Change 'long_values_percentage' to 'percentage' to match the structure expected by Recharts
        'refactored_data': {}  # Store refactored data
    }

    # Loop through columns to check for long data values
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains string data
            long_values_count = sum(1 for value in data[column] if isinstance(value, str) and len(value) > threshold)
            total_values = len(data[column])
            long_values_percentage = (long_values_count / total_values) * 100 if total_values > 0 else 0

            metrics['attribute'].append(column)  # Append column name to 'attribute'
            metrics['long_values_count'].append(long_values_count)  # Append count of long values to 'count'
            metrics['long_values_percentage'].append(long_values_percentage)  # Append percentage of long values to 'percentage'

            # Refactor long data values
            refactored_data_column = data[column].apply(lambda x: None if isinstance(x, str) and len(x) > threshold else x)
            metrics['refactored_data'][column] = refactored_data_column

    # Print refactored dataset
    refactored_df = pd.DataFrame(metrics['refactored_data'])
    print("Refactored Dataset:")
    print(refactored_df)

    return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = detect_and_report_long_data_values_metrics(df, threshold=50)
# print(metrics)
