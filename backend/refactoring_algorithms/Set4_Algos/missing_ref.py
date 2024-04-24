import pandas as pd

def refactor_missing_data_smell(data, method='mean'):
   
    refactored_data = data.copy()

    # Loop through columns to refactor missing values
    for column in refactored_data.columns:
        if refactored_data[column].isnull().any():
            if method == 'mean':
                refactored_data[column].fillna(refactored_data[column].mean(), inplace=True)
            elif method == 'mode':
                refactored_data[column].fillna(refactored_data[column].mode()[0], inplace=True)
            elif method == 'median':
                refactored_data[column].fillna(refactored_data[column].median(), inplace=True)
            elif method == 'drop':
                refactored_data = refactored_data.dropna(subset=[column])
            # Add more refactoring methods as needed

    return refactored_data

# Example usage:
# Assume 'df' is your pandas DataFrame
# refactored_df = refactor_missing_data_smell(df, method='mean')
# print(refactored_df)
