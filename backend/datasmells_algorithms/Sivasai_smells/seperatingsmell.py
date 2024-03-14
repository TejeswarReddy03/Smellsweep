import pandas as pd
import re

def identify_separating_smell(data):
    """
    Identify the separating smell in a DataFrame.

    Parameters:
    - data: pandas DataFrame
    
    Returns:
    - metrics: Dictionary containing the results of separating smell detection
    """

    # Define regular expression for identifying thousands separators
    regex_separators = re.compile(r'[.,]')

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with separating smell': 0,
        'Percentage of separating smell per attribute': {},
        'Impact on analysis (qualitative)': "Not assessed",
        'Message': "Separating smell not detected"
    }

    # Loop through columns to check for separating smell
    for column in data.columns:
        # Check if the column contains only numeric or numeric with separators
        if pd.to_numeric(data[column], errors='coerce').notna().all():
            # Check for separating smell only in numeric cells
            numeric_cells = pd.to_numeric(data[column], errors='coerce')

            # Ensure only numeric cells are considered
            numeric_cells = numeric_cells.dropna()

            # Check for separating smell in the numeric cells
            separating_count = numeric_cells.astype(str).str.contains(regex_separators, na=False).sum()
            separating_percentage = (separating_count / len(numeric_cells)) * 100

            metrics['Number of data points with separating smell'] += separating_count
            metrics['Percentage of separating smell per attribute'][column] = separating_percentage

    # Convert int64 values to standard Python types
    metrics['Number of data points with separating smell'] = int(metrics['Number of data points with separating smell'])
    for key, value in metrics['Percentage of separating smell per attribute'].items():
        metrics['Percentage of separating smell per attribute'][key] = float(value)

    # Remove information if there is no separating smell
    if metrics['Number of data points with separating smell'] == 0:
        metrics.pop('Percentage of separating smell per attribute')
    if metrics['Number of data points with separating smell'] > 0:
        metrics['Message'] = "Separating smell detected"

    return metrics

# Example usage
data = pd.DataFrame({'column1': ["1,000", "2.5", "3,000", "4.5", "5"],
                     'column2': ["6", "7.8", "8", "9.9", "10"],
                     'column3': ["A", "B", "C", "D", "E"],
                     'column4': ["32siva", "32feb", "43", "invalid", "5.5"]})
result = identify_separating_smell(data)

# Convert the result to a JSON-serializable format
result_json = {key: value if not isinstance(value, pd.Series) else value.to_list() for key, value in result.items()}

print(result_json)
