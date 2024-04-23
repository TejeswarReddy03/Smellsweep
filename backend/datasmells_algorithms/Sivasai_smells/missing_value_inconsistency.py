import pandas as pd

def identify_missing_value_inconsistency(data):
    # Specify the rules for identifying missing value inconsistency
    missing_value_rules = ["-999", "NULL", "NaN", "N/A", "", "unknown", "missing", "Missing", "null", "Unknown"]

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with missing value inconsistency': 0,
        'Percentage of missing value inconsistency per attribute': {},
        'Percentage of each type of missing value': {},
        'Impact on analysis (qualitative)': "Not assessed",
        'Message': "missing value inconsistency not detected",
        'Missing value counts for plotting': {}
    }

    # Loop through columns to check for missing value inconsistency
    for column in data.columns:
        # Check for missing value inconsistency using specified rules and pd.isna()
        inconsistency_count = data[data[column].isin(missing_value_rules) | pd.isna(data[column])].shape[0]
        inconsistency_percentage = (inconsistency_count / data.shape[0]) * 100

        metrics['Number of data points with missing value inconsistency'] += inconsistency_count
        metrics['Percentage of missing value inconsistency per attribute'][column] = inconsistency_percentage

        # Calculate the percentage of each type of missing value
        type_percentage = {}
        for rule in missing_value_rules:
            rule_count = data[data[column].astype(str).str.lower() == rule.lower()].shape[0]  # Case-insensitive comparison
            rule_percentage = (rule_count / data.shape[0]) * 100
            if rule_percentage > 0:
                type_percentage[rule] = rule_percentage
                metrics['Missing value counts for plotting'][rule] = metrics['Missing value counts for plotting'].get(rule, 0) + rule_count

        metrics['Percentage of each type of missing value'][column] = type_percentage

    # Remove information if there are no missing values
    if metrics['Number of data points with missing value inconsistency'] == 0:
        metrics.pop('Percentage of missing value inconsistency per attribute')
        metrics.pop('Percentage of each type of missing value')
    if metrics['Number of data points with missing value inconsistency'] > 0:
        metrics['Message'] = "missing value inconsistency detected"

    return metrics

