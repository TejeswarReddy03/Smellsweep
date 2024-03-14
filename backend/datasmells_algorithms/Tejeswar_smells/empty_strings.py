import pandas as pd

def detect_and_analyze_empty_strings_rule_based(dataframe):
    # Detect and analyze empty strings using a rule-based approach
    empty_string_metrics = analyze_empty_strings_rule_based(dataframe)

    return empty_string_metrics

def analyze_empty_strings_rule_based(dataframe):
    count = 0

    for col in dataframe.columns:
        for index, value in dataframe[col].items():
            # Check if the value is a non-empty string
            if isinstance(value, str) and value == "'" :
                print(value,"ddd")
                count += 1

    return count
    
   
