import pandas as pd
import re

def identify_data_type_inconsistency(data):
    """
    Identify the count of each data type in each column of a DataFrame using regular expressions.

    Parameters:
    - data: pandas DataFrame
    
    Returns:
    - metrics: Dictionary containing the count of each data type for each column (excluding 0 counts)
    """

    # Define regular expressions for different data types
    regex_int = re.compile(r'^[+-]?\d+$')
    regex_float = re.compile(r'^[+-]?\d+\.\d+$')
    regex_date = re.compile(r'^\d{4}-\d{2}-\d{2}$')
    regex_time = re.compile(r'^\d{2}:\d{2}:\d{2}$')

    # Create metrics dictionary to store results
    metrics = {
        'Data type counts per attribute': {},
        'Data type counts for plotting': {}
    }

    # Loop through columns to check for data types
    for column in data.columns:
        data_type_counts = {
            'int': 0,
            'float': 0,
            'date': 0,
            'time': 0,
            'string': 0
        }

        # Identify data types based on regular expressions
        for value in data[column]:
            str_value = str(value)
            if regex_int.match(str_value):
                data_type_counts['int'] += 1
            elif regex_float.match(str_value):
                data_type_counts['float'] += 1
            elif regex_date.match(str_value):
                data_type_counts['date'] += 1
            elif regex_time.match(str_value):
                data_type_counts['time'] += 1
            else:
                data_type_counts['string'] += 1

        # Exclude entries with a count of 0
        non_zero_counts = {key: value for key, value in data_type_counts.items() if value != 0}

        if non_zero_counts:
            metrics['Data type counts per attribute'][column] = non_zero_counts

        metrics['Data type counts for plotting'][column] = data_type_counts

    return metrics
