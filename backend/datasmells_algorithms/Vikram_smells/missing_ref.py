import pandas as pd

def refactor_missing_data_smell(data, method='mean'):
    # Initialize metrics dictionary to store results
    refactored_data = {}

    # Loop through columns to refactor missing values
    for column in data.columns:
        # Refactor missing values
        refactored_data_column = data[column].copy()  # Copy the column to avoid modifying the original data
        if method == 'mean':
            refactored_data_column.fillna(data[column].mean(), inplace=True)
        elif method == 'mode':
            refactored_data_column.fillna(data[column].mode()[0], inplace=True)
        elif method == 'median':
            refactored_data_column.fillna(data[column].median(), inplace=True)
        else:
            # print(f"Invalid imputation method '{method}'. Replacing missing values with None.")
            refactored_data_column.fillna(None, inplace=True)

        refactored_data[column] = refactored_data_column

    # Print refactored dataset
    refactored_df = pd.DataFrame(refactored_data)
    print("Refactored Dataset:")
    print(refactored_df)

    return refactored_data

# Example usage:
# Assume 'df' is your pandas DataFrame
# refactored_data = refactor_missing_data_smell(df, method='mean')
# print(refactored_data)
