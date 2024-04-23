import pandas as pd
import re
from collections import Counter

def refactor_unit_inconsistency(data):
    """
    Refactor data to address unit inconsistency.

    Parameters:
    - data: pandas DataFrame
    
    Returns:
    - refactored_data: pandas DataFrame with unit inconsistency addressed
    """

    # Predefined set of valid units with their full forms and short forms
    valid_units = {'meters', 'metres', 'm', 'feet', 'ft', 'miles', 'mi', 'kilometers', 'kilometres', 'km', 'cm', 'centimeters', 'centimetres', 'mm', 'millimeters', 'millimetres',
                   'inches', 'in', 'liters', 'litres', 'L', 'gallons', 'gallon', 'gal', 'kilograms', 'kg', 'grams', 'g', 'pounds', 'lbs', 'milliseconds', 'ms', 'seconds', 'secs', 's',
                   'minutes', 'mins', 'hours', 'hrs', 'days', 'd'}

    # Convert valid units set to lowercase for case insensitivity
    valid_units_lower = {unit.lower() for unit in valid_units}

    # Loop through columns to check for unit inconsistency
    for column in data.columns:
        # Create a list to store all units in the column
        all_units = []

        # Check for unit inconsistency using regular expressions
        for i, value in data[column].items():
            matches = re.findall(r'(\d+)\s*([a-zA-Z]+)', str(value))
            for match in matches:
                numerical_value, unit = match
                unit_lower = unit.lower()
                if unit_lower in valid_units_lower:
                    all_units.append(unit_lower)

        # If units are present in the column, determine the most prevalent unit
        if all_units:
            most_common_unit = Counter(all_units).most_common(1)[0][0]

            # Replace all units in the column with the most prevalent unit
            data[column] = data[column].apply(lambda x: re.sub(r'(\d+)\s*([a-zA-Z]+)', r'\1 {}'.format(most_common_unit), str(x)))

    refactored_data = data.to_json(orient='records')
    print(data)
    # return refactored_data
    return data
    
# # Example usage
# data = pd.DataFrame({'column1': ["13 metres", "14 metres", "15 in", "16 cm"],
#                      'column2': ["20 kg", "21 lbs", "22 cm", "23 kg"]})

# refactored_data = refactor_unit_inconsistency(data)
# print(refactored_data)
