import pandas as pd

def detect_float_as_string(df):
    """
    This function detects columns in a DataFrame that potentially contain floating-point numbers stored as strings.

    Args:
        df (pandas.DataFrame): The DataFrame to analyze.

    Returns:
        dict: A dictionary where keys are column names and values are percentages of cells containing potential data smells (float as string).
    """
    float_as_string = {}  # Dictionary to store detected instances
    print("in float_as_string.py")
    print(df)
    print(df.dtypes)
    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Check if the column contains any text strings that can be converted to floating-point numbers
        string_float_count = sum(is_float(value) for value in df[column] if isinstance(value, str))
        total_cells = len(df[column])

        # Calculate percentage of cells in the column that are floating-point numbers stored as strings
        percentage = (string_float_count / total_cells) * 100

        # If percentage is greater than 0, it indicates the presence of the data smell
        if percentage > 0:
            float_as_string[column] = percentage

    # Include status attribute
    status = bool(float_as_string)  # True if any float-as-string smells were detected, False otherwise
    print(float_as_string)
    return {'float_as_string': float_as_string, 'status': status}

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


