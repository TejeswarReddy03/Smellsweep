import pandas as pd
import re

def identify_spacing_smell(data):
    """
    Identify unusual patterns of spaces within data values in each column of a DataFrame.

    Parameters:
    - data: pandas DataFrame
    
    Returns:
    - metrics: Dictionary containing the results of spacing smell detection
    """

    # Define regular expression for detecting unusual patterns of spaces
    regex_spacing = re.compile(r'\s{2,}')

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with spacing smell': 0,
        'Percentage of spacing smell per attribute': {},
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Loop through columns to check for spacing smell
    for column in data.columns:
        # Check for spacing smell using regular expression
        spacing_smell_count = data[data[column].astype(str).apply(lambda x: bool(regex_spacing.search(x)))].shape[0]
        spacing_smell_percentage = (spacing_smell_count / data.shape[0]) * 100

        # Exclude entries with a percentage of 0
        if spacing_smell_percentage > 0:
            metrics['Number of data points with spacing smell'] += spacing_smell_count
            metrics['Percentage of spacing smell per attribute'][column] = spacing_smell_percentage

    # Check if no smell is detected
    if metrics['Number of data points with spacing smell'] == 0:
        metrics['Message'] = "No smell detected"

    return metrics

