import pandas as pd
import re
from collections import defaultdict

def detect_and_analyze_units_rule_based(dataframe):
    inconsistent_units = detect_and_standardize_units_rule_based(dataframe)
    print("Inconsistent Unit Counts:")
    for unit, count in inconsistent_units.items():
        print(f"{unit}: {count} occurrences")           
    return len(inconsistent_units)

def detect_and_standardize_units_rule_based(dataframe):
    inconsistent_units = defaultdict(int)

    standardized_dataframe = dataframe.copy()

    for col in dataframe.columns:
        for index, value in dataframe[col].items():
            if isinstance(value, str):
                units = re.findall(r'[a-zA-Z]+', value)

                if units:
                    standardized_unit = units[0].lower()
                    for unit in units[1:]:
                        if unit.lower() != standardized_unit:
                            inconsistent_units[unit.lower()] += 1

                            value = value.replace(unit, standardized_unit)
                            standardized_dataframe.at[index, col] = value

    return inconsistent_units
