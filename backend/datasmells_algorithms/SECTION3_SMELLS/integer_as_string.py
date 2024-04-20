import pandas as pd

def detect_integer_as_string(df):
    integer_as_string = {}  # Dictionary to store detected instances
    print("in integer_as_string.py")
    print(df)
    print(df.dtypes)
    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Check if the column contains any text strings that can be converted to integers
        integer_count = sum(value.isdigit() for value in df[column] if isinstance(value, str))
        total_rows = len(df[column])
        
        # Calculate the percentage of rows in the column that contain integers stored as strings
        if integer_count > 0:
            percentage = (integer_count / total_rows) * 100
            integer_as_string[column] = {
                'percentage': percentage,
                'rows_with_smell': integer_count
            }

    # Include status attribute
    status = bool(integer_as_string)  # True if any integer-as-string smells were detected, False otherwise
    return {'integer_as_string': integer_as_string, 'status': status}


