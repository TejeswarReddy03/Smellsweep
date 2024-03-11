import pandas as pd
import re
from collections import defaultdict

def detect_and_analyze_units_rule_based(dataframe):
    # Display the original DataFrame
    print("Original DataFrame:")
    print(dataframe)

    # Detect and analyze inconsistent unit representations using a rule-based approach
    inconsistent_units, standardized_dataframe = detect_and_standardize_units_rule_based(dataframe)

    if inconsistent_units:
        print("\nInconsistent Unit Representation Metrics:")
        for unit, occurrences in inconsistent_units.items():
            print(f"{unit}: {occurrences} occurrences")
    else:
        print("\nNo inconsistent unit representations found.")

    return standardized_dataframe

def detect_and_standardize_units_rule_based(dataframe):
    inconsistent_units = defaultdict(int)

    # Create a copy of the original DataFrame for standardization
    standardized_dataframe = dataframe.copy()

    # Iterate through each cell in the DataFrame
    for col in dataframe.columns:
        for index, value in dataframe[col].items():
            if isinstance(value, str):
                # Extract units using regular expression
                units = re.findall(r'[a-zA-Z]+', value)

                # Check for inconsistencies in unit representation
                if units:
                    standardized_unit = units[0].lower()
                    for unit in units[1:]:
                        if unit.lower() != standardized_unit:
                            # Increment occurrences for inconsistent unit representation
                            inconsistent_units[unit] += 1

                            # Apply rule-based standardization to the copy of the DataFrame
                            value = value.replace(unit, standardized_unit)
                            standardized_dataframe.at[index, col] = value

    return inconsistent_units

# Example usage:
# Assuming you have a DataFrame named 'your_dataframe'

# Detect and analyze inconsistent units using a rule-based approach
# standardized_df = detect_and_analyze_units_rule_based(your_dataframe)
