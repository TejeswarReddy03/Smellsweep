import pandas as pd
import datetime
import re

def assess_ambiguous_date_formats(data):
    """
    Description: Assess date/time formats in columns with datetime-like data.

    Parameters:
    - data: DataFrame, input data

    Returns:
    - column_formats: dictionary containing counts of different date formats for each column
    """
    # Function to check if a value can be converted to a date
    def is_date(value):
        formats = ['%Y/%m/%d', '%m/%d/%Y', '%m-%d-%Y', '%Y-%m-%d', '%m.%d.%Y']  # List of date formats to check
        for fmt in formats:
            try:
                datetime.datetime.strptime(str(value), fmt)
                return True
            except ValueError:
                continue
        return False

    # Initialize dictionary to store counts of different formats for each column
    column_formats = {}

    # Iterate over each column
    for col in data.columns:
        # Initialize counters for different formats
        date_formats_count = {'YYYY/MM/DD': 0, 'MM/DD/YYYY': 0, 'MM-DD-YYYY': 0, 'YYYY-MM-DD': 0, 'MM.DD.YYYY': 0, 'Other': 0}

        # Check if the column potentially contains dates stored as strings
        for value in data[col]:
            if is_date(value):
                for format_name, pattern in zip(date_formats_count.keys(), [
                    r'\d{4}/\d{2}/\d{2}',  # YYYY/MM/DD
                    r'\d{2}/\d{2}/\d{4}',  # MM/DD/YYYY
                    r'\d{2}-\d{2}-\d{4}',  # MM-DD-YYYY
                    r'\d{4}-\d{2}-\d{2}',  # YYYY-MM-DD
                    r'\d{2}\.\d{2}\.\d{4}',  # MM.DD.YYYY
                ]):
                    if re.match(pattern, str(value)):
                        date_formats_count[format_name] += 1
                        break
                else:
                    date_formats_count['Other'] += 1

        # Store the counts for this column
        column_formats[col] = date_formats_count

    return column_formats
