import pandas as pd

def refactor_casing_data_smells(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'attribute': [],  # Change 'attributes' to 'attribute' to match the structure expected by Recharts
        'count': [],       # Change 'counts' to 'count' to match the structure expected by Recharts
        'refactored_data': {}  # Store refactored data
    }

    # Loop through columns to check for casing inconsistency
    for column in data.columns:
        if data[column].dtype == 'object':  # Check if the column contains string data
            unique_values = data[column].unique()
            casing_inconsistency_count = sum(1 for value in unique_values if isinstance(value, str) and (value.lower() != value and value.upper() != value))
            metrics['attribute'].append(column)  # Append column name to 'attribute'
            metrics['count'].append(casing_inconsistency_count)  # Append count of casing inconsistencies to 'count'

            # Refactor casing inconsistencies
            refactored_data_column = data[column].apply(lambda x: x.lower() if isinstance(x, str) and (x.lower() != x and x.upper() != x) else x)
            metrics['refactored_data'][column] = refactored_data_column

    # Print refactored dataset
    refactored_df = pd.DataFrame(metrics['refactored_data'])
    print("Refactored Dataset:")
    print(refactored_df)

    return metrics

# Example usage:
# Assume 'df' is your pandas DataFrame
# metrics = detect_and_report_casing_data_smells(df)
# print(metrics)
