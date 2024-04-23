import pandas as pd

def refactor_long_data_values(data, thresholds=None, min_length=5):
    if thresholds is None:
        thresholds = {}  # Default thresholds for each column

    # Initialize dictionary to store refactored data
    refactored_data = {}

    # Loop through columns
    for column in data.columns:
        # Check if the column contains string data
        if data[column].dtype == 'object':
            # Check if the column has a specified threshold
            threshold = thresholds.get(column, None)
            # Refactor long text values
            refactored_data_column = data[column].apply(lambda x: x[:threshold] if isinstance(x, str) and len(x) > threshold else x)
            # Adjust text values to meet minimum length
            refactored_data_column = refactored_data_column.apply(lambda x: x + ' ' * (min_length - len(str(x))) if isinstance(x, str) and len(x) < min_length else x)
            refactored_data[column] = refactored_data_column
        else:
            # For non-text fields, simply copy the data
            refactored_data[column] = data[column]

    return pd.DataFrame(refactored_data)

# Example usage:
# Assume 'df' is your DataFrame
# thresholds = {'text_field1': 50, 'text_field2': 100}  # Specify thresholds for specific columns
# refactored_df = refactor_long_data_values(df, thresholds=thresholds)
# print("Refactored Dataset:")
# print(refactored_df)
