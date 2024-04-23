import pandas as pd

def replace_dummy_values(data):
    """
    Replace dummy values with an approximated good value or remove the entire row.

    Parameters:
    data (DataFrame): The input DataFrame.

    Returns:
    cleaned_data (DataFrame): DataFrame with dummy values replaced or rows containing dummy values removed.
    """

    dummy_value_rules = [-999, "NULL"]
    cleaned_data = data.copy()

    # Loop through columns to replace or remove dummy values
    for column in cleaned_data.columns:
        # Replace or remove dummy values
        cleaned_data[column] = cleaned_data[column].apply(lambda x: replace_or_remove(x, dummy_value_rules, cleaned_data[column]))

    # Remove rows with any dummy values
    cleaned_data = cleaned_data.dropna()

    return cleaned_data

def replace_or_remove(value, dummy_value_rules, column_data):
    """
    Replace a dummy value with an approximated good value or remove the entire row.

    Parameters:
    value: The value to be replaced.
    dummy_value_rules (list): List of dummy value rules.
    column_data (Series): The data in the column.

    Returns:
    value: The replaced value or NaN if the value matches any dummy value rule.
    """
    if value in dummy_value_rules:
        if column_data.dtype == 'int64':
            # Replace dummy value with the mean of the column
            return column_data.mean()
        elif column_data.dtype == 'object':
            # Replace dummy value with the most frequent word in the column
            return column_data.mode()[0]
    else:
        return value

# Example usage:
# Load your DataFrame
# data = pd.read_csv('your_data.csv')

# Replace dummy values or remove rows containing dummy values
# cleaned_data = replace_dummy_values(data)

# Print or save the cleaned DataFrame
# print(cleaned_data)
# cleaned_data.to_csv('cleaned_data.csv', index=False)
