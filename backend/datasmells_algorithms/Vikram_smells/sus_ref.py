import pandas as pd

def refactor_suspect_class_values(data):
    # Initialize dictionary to store refactored data
    refactored_data = {}

    # Loop through columns
    for column in data.columns:
        # Refactor suspect class values
        refactored_data_column = data[column].copy()  # Copy the column to avoid modifying the original data
        for index, value in enumerate(data[column]):
            if not pd.isnull(value) and not str(value).strip():  # Skip NaN and empty values
                continue

            if not pd.isnull(value) and not value.strip():  # Check for whitespace-only values
                refactored_data_column.at[index] = None  # Replace whitespace-only values with None
                continue

            if not pd.isnull(value) and value.strip().lower() in ['unknown', 'not available', 'na']:  # Check for common suspect values
                refactored_data_column.at[index] = None  # Replace suspect values with None

        refactored_data[column] = refactored_data_column

    # Print refactored dataset
    refactored_df = pd.DataFrame(refactored_data)
    print("Refactored Dataset:")
    print(refactored_df)

    return refactored_data

# Example usage:
# refactored_data = refactor_suspect_class_values(df)
# print(refactored_data)
