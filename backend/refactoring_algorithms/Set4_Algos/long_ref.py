import pandas as pd

def refactor_long_data_values(data, threshold=50, replacement='Truncated'):
    refactored_data = data.copy()

    for column in refactored_data.columns:
        if refactored_data[column].dtype == 'object':  # Check if the column contains string data
            long_values_mask = refactored_data[column].str.len() > threshold
            if long_values_mask.any():  # Check if there are any long values
                refactored_data.loc[long_values_mask, column] = refactored_data.loc[long_values_mask, column].str[:threshold]
                refactored_data[column] = refactored_data[column].fillna(replacement)  # Replace NaN values with 'Truncated'

    return refactored_data

# Example usage:
# refactored_df = refactor_long_data_values(df, threshold=50, replacement='Truncated')
# print(refactored_df)
