import pandas as pd

def detect_and_report_duplicate_data(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'Number of duplicate data points': 0,
        'Percentage of duplicate data points': 0,
        'Top 5 duplicate values per attribute': {},
        'Duplicate value counts per attribute': {},
        'Duplicate value distribution per attribute': {},
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Detect duplicate data points
    duplicate_rows = data[data.duplicated()]
    metrics['Number of duplicate data points'] = len(duplicate_rows)
    metrics['Percentage of duplicate data points'] = (len(duplicate_rows) / len(data)) * 100

    # Loop through columns to check for duplicate values
    for column in data.columns:
        # Count duplicate values
        duplicate_count_per_attribute = data[data.duplicated(subset=[column])][column].value_counts().to_dict()
        metrics['Duplicate value counts per attribute'][column] = duplicate_count_per_attribute

        # Distribution of duplicate values per attribute
        duplicate_distribution_per_attribute = data[data.duplicated(subset=[column])].groupby(column).size().to_dict()
        metrics['Duplicate value distribution per attribute'][column] = duplicate_distribution_per_attribute

        # Get top 5 duplicate values for each attribute
        top_duplicate_values = data[data.duplicated(subset=[column])][column].value_counts().head(5)
        metrics['Top 5 duplicate values per attribute'][column] = top_duplicate_values.to_dict()

    return metrics