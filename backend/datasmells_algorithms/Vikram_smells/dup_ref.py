import pandas as pd

def refactor_duplicate_data(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'attribute': [],  # Change 'attributes' to 'attribute' to match the structure expected by Recharts
        'count': [],       # Change 'counts' to 'count' to match the structure expected by Recharts
        'refactored_data': {}  # Store refactored data
    }

    # Loop through columns to check for duplicate values
    for column in data.columns:
        # Count duplicate values
        duplicate_count_per_attribute = len(data[data.duplicated(subset=[column])][column].value_counts())
        metrics['attribute'].append(column)  # Append column name to 'attribute'
        metrics['count'].append(duplicate_count_per_attribute)  # Append count of duplicate values to 'count'

        # Refactor duplicate values
        refactored_data_column = data[column].copy()  # Copy the column to avoid modifying the original data
        duplicate_indices = data[data.duplicated(subset=[column])].index  # Get indices of duplicate rows
        for index in duplicate_indices:
            refactored_data_column.at[index] = None  # Replace duplicate values with None

        metrics['refactored_data'][column] = refactored_data_column

    # Print refactored dataset
    refactored_df = pd.DataFrame(metrics['refactored_data'])
    print("Refactored Dataset:")
    print(refactored_df)

    return metrics

# Example usage:
# Assume 'df' is your pandas DataFrame
# metrics = detect_and_report_duplicate_data(df)
# print(metrics)
