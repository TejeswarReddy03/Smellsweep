import pandas as pd

def identify_dummy_values(data):
    dummy_value_rules = ["-999", "NULL"]

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with dummy values': 0,
        'Percentage of dummy values per attribute': {},
        'Distribution of dummy values': {},
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Loop through columns to check for dummy values
    for column in data.columns:
        # Check for dummy values using predefined rules and pd.isna()
        dummy_count = data[data[column].isin(dummy_value_rules) | pd.isna(data[column])].shape[0]
        dummy_percentage = (dummy_count / data.shape[0]) * 100

        metrics['Number of data points with dummy values'] += dummy_count
        metrics['Percentage of dummy values per attribute'][column] = dummy_percentage

        # Check distribution of dummy values
        dummy_distribution = data[data[column].isin(dummy_value_rules) | pd.isna(data[column])].groupby(column).size().to_dict()
        metrics['Distribution of dummy values'][column] = dummy_distribution

    # Update the impact on analysis based on your specific considerations
    metrics['Impact on analysis (qualitative)'] = "To be assessed based on specific use case"

    return metrics
