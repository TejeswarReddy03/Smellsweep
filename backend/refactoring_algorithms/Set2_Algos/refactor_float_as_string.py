import pandas as pd
import numpy as np

def refactor_float_as_string(df):
    """
    This function detects columns in a DataFrame that potentially contain floating-point numbers stored as strings.
    If the percentage of float-as-string values in a column is greater than 90%, it replaces non-float values with NaN.

    Args:
        df (pandas.DataFrame): The DataFrame to analyze and modify.

    Returns:
        pandas.DataFrame: The modified DataFrame with potentially problematic cells replaced by NaN.
        dict: A dictionary where keys are column names and values are percentages of cells containing potential data smells (float as string).
    """
    # Dictionary to store detected instances
    

    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Check if the column contains any text strings that can be converted to floating-point numbers
        string_float_count = sum(isinstance(value, str) and (is_float(value) or value.isdigit()) for value in df[column])

        total_cells = len(df[column])

        # Calculate percentage of cells in the column that are floating-point numbers stored as strings
        percentage = (string_float_count / total_cells) * 100

        # If percentage is greater than 90%, replace non-float values in that column with NaN
        if percentage > 80:
            df[column] = df[column].apply(lambda x: np.nan if not (is_float(x) or x.isdigit()) else x)

        # If percentage is greater than 0, it indicates the presence of the data smell
       

    return df

# Function to check if a string can be converted to a float, considering trailing zeros
def is_float(value):
    """
    This function checks if a string can be converted to a float, considering trailing zeros.

    Args:
        value (str): The string to check.

    Returns:
        bool: True if the string can be converted to a float and represents the same number without trailing zeros as the converted float, False otherwise.
    """
    try:
        # Try converting the value to float
        float_value = float(value)
        # Check if the original string represents the same number as the float without trailing zeros.
        # This ensures we capture trailing zeros while excluding integers.
        return value.rstrip('0') == str(float_value).rstrip('0')
    except ValueError:
        pass
    return False


