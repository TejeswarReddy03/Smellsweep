import pandas as pd

def refactor_casing_data_smells(data):
    # Make a copy of the original DataFrame to avoid modifying the input DataFrame
    refactored_data = data.copy()

    # Loop through DataFrame rows to fix casing inconsistency
    for index, row in refactored_data.iterrows():
        for column in refactored_data.columns:
            if isinstance(row[column], str) and (row[column].lower() != row[column] and row[column].upper() != row[column]):
                refactored_data.at[index, column] = row[column].lower()  # Fix casing inconsistency by converting to lowercase

    return refactored_data

# Example usage:
# Assume 'df' is your pandas DataFrame
# refactored_df = refactor_casing(df)
# print(refactored_df)
