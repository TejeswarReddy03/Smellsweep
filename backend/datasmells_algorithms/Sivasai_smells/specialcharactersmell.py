import pandas as pd
import re
from collections import Counter

def identify_special_characters_inconsistency(data):
    # Create metrics dictionary to store results
    metrics = {
        'Special Characters Inconsistency Detected': False,
        'Message': "No special characters inconsistency detected",
        'Affected Columns': {}
    }

    # Loop through columns to dynamically determine regex patterns
    for column in data.columns:
        # Get unique values in the column
        unique_values = data[column].astype(str).unique()

        # Combine unique values into a string for regex pattern analysis
        values_string = " ".join(unique_values)

        # Define a regex pattern for pure numeric values
        numeric_pattern = r'^\d+$'

        # Check if the observed data contains non-numeric characters
        if not re.match(numeric_pattern, values_string):
            # Define a regex pattern for alphanumeric characters
            alphanumeric_pattern = r'^[a-zA-Z0-9]+$'

            # Check if the observed data contains special characters beyond alphanumeric characters
            special_characters = re.findall(r'[^\w\s]', values_string)
            if special_characters:
                metrics['Special Characters Inconsistency Detected'] = True
                metrics['Message'] = "Special characters inconsistency detected"
                metrics['Affected Columns'][column] = Counter(special_characters)

    return metrics

# # Example usage:
# # Assuming df is your DataFrame
# data_with_inconsistency = pd.DataFrame({
#     'PureNumberColumn': ['123', '456', '789', '1000'],
#     'SpecialCharColumn': ['!@#', '&*', '()$', '%^', '!@#$%^&'],
#     'MixedColumn': ['abc123', 'def456', '!@#', '789', 'xyz'],
#     'EmailColumn': ['siv@123gmail.com', 'ret@123gamil.com', 'cs@iittp.ac.in']
# })

# result_with_inconsistency = identify_special_characters_inconsistency(data_with_inconsistency)

# # Display results
# print("Example with Special Characters Inconsistency:")
# print(result_with_inconsistency)
