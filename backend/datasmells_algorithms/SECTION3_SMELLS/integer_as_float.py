import pandas as pd

def detect_integer_as_float(df):
    integer_as_float = {}  # Dictionary to store detected instances

    # Step 1: Identify columns that represent some integer or float values
    for column in df.columns:
        # Check if the column contains both integer and float values
        if any(isinstance(value, (int, float)) for value in df[column]):
            # Step 2: Check each cell in the column
            count_float_represented_as_int = 0
            count_total_float = 0
            for value in df[column]:
                if isinstance(value, float):
                    count_total_float += 1
                    # Check if the float value can be represented as an integer
                    if value.is_integer():
                        count_float_represented_as_int += 1
            
            # Calculate the percentage of cells where float values can be represented as integers
            if count_total_float > 0:
                percentage = (count_float_represented_as_int / count_total_float) * 100
                if percentage > 0:  # If there are cells where float values can be represented as integers
                    integer_as_float[column] = {
                        'percentage': percentage,
                        'rows_with_smell': count_float_represented_as_int
                    }

    # Include status attribute
    status = bool(integer_as_float)  # True if any integer-as-float smells were detected, False otherwise
    return {'integer_as_float': integer_as_float, 'status': status}
