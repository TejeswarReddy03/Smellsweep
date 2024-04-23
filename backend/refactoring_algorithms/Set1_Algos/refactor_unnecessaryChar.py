import pandas as pd
import re

def clean_cell(cell):
    """
    Clean a cell by removing unnecessary characters.

    Parameters:
    cell (str): The input cell value.

    Returns:
    cleaned_cell (str): The cleaned cell value.
    """
    # Define a regular expression pattern to match unnecessary characters
    pattern = r'[^a-zA-Z0-9\s]'  # This pattern will keep only alphanumeric characters and spaces

    # Use regular expression substitution to remove unnecessary characters
    cleaned_cell = re.sub(pattern, '', cell)

    return cleaned_cell

def clean_csv(csv_file):
    """
    Clean a CSV file by removing unnecessary characters from all cells.

    Parameters:
    csv_file (str): The path to the input CSV file.

    Returns:
    df (DataFrame): The cleaned DataFrame.
    """
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file)

    # Apply the clean_cell function to each cell in the DataFrame
    df = df.applymap(clean_cell)

    return df

# Example usage:
# Clean the CSV file and save the cleaned DataFrame to a new CSV file
# cleaned_df = clean_csv('your_data.csv')
# cleaned_df.to_csv('cleaned_data.csv', index=False)
