import pandas as pd

def detect_and_analyze_empty_strings_rule_based(dataframe):
    # Display the original DataFrame
    print("Original DataFrame:")
    print(dataframe)

    # Detect and analyze empty strings using a rule-based approach
    empty_string_metrics = analyze_empty_strings_rule_based(dataframe)

    if empty_string_metrics:
        print("\nEmpty String Metrics:")
        for metric, value in empty_string_metrics.items():
            print(f"{metric}: {value}")
    else:
        print("\nNo empty strings detected.")

def analyze_empty_strings_rule_based(dataframe):
    empty_string_count = 0

    # Iterate through each cell in the DataFrame
    for col in dataframe.columns:
        empty_string_count += dataframe[col].eq('').sum()

    # Calculate metrics based on empty strings
    empty_string_metrics = {'Empty String Count': empty_string_count}
    
    return empty_string_metrics
