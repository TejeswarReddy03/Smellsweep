import pandas as pd
import numpy as np

def refactor_integer_as_string(df):
    integer_as_string = {}  # Dictionary to store detected instances
    
    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Check if the column contains any text strings that can be converted to integers
        integer_count = sum(value.isdigit() for value in df[column] if isinstance(value, str))
        total_rows = len(df[column])
        
        # Calculate the percentage of rows in the column that contain integers stored as strings
        if integer_count > 0:
            percentage = (integer_count / total_rows) * 100
           
            # Check if the percentage is more than 80%
            if percentage > 80:
                # Replace non-integer strings with NaN
                df[column] = pd.to_numeric(df[column], errors='coerce')

    # Include status attribute
     # True if any integer-as-string smells were detected, False otherwise
    return df

