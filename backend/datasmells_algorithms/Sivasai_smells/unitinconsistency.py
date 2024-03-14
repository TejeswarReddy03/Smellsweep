import pandas as pd
import re

def identify_unit_inconsistency(data):
    # Predefined set of valid units
    valid_units = {'meters', 'feet', 'miles', 'kilometers', 'liters', 'gallons', 'kilograms', 'pounds', 'milliseconds', 'seconds', 'minutes', 'hours', 'days'}

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with unit inconsistency': 0,
        'Percentage of unit inconsistency per attribute': {},
        'Impact on analysis (qualitative)': "Not assessed",
        'Unique units detected': set(),
        'Message': "Unit inconsistency not detected"
    }

    # Loop through columns to check for unit inconsistency
    for column in data.columns:
        # Create a set to store unique units in the column
        unique_units = set()

        # Check for unit inconsistency using regular expressions
        for value in data[column]:
            matches = re.findall(r'(\d+)\s*([a-zA-Z]+)', str(value))
            for match in matches:
                numerical_value, unit = match
                unit = unit.lower()  # Convert to lowercase for case-insensitive comparison
                if unit in valid_units:
                    unique_units.add(unit)

        # Update metrics based on the unique units found
        if len(unique_units) > 1:
            metrics['Number of data points with unit inconsistency'] += len(unique_units)
            total_data_points = len(data[column])
            percentage = (len(unique_units) / total_data_points) * 100.0
            metrics['Percentage of unit inconsistency per attribute'][column] = percentage
            metrics['Unique units detected'].update(unique_units)

    # Convert sets to lists before returning the metrics
    metrics['Unique units detected'] = list(metrics['Unique units detected'])

    # Update message if unit inconsistency is detected
    if metrics['Number of data points with unit inconsistency'] > 0:
        metrics['Message'] = "Unit inconsistency detected"

    return metrics

