import pandas as pd

def detect_and_report_missing_data(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'Number of missing data points': 0,
        'Percentage of missing data points': 0,
        'Columns with missing values': [],
        'Missing value counts per column': {},
        'Probability of missing values per column': {},
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Detect missing data points
    missing_values = data.isnull().sum()
    total_missing = missing_values.sum()
    metrics['Number of missing data points'] = int(total_missing)
    metrics['Percentage of missing data points'] = (total_missing / data.size) * 100

    # Columns with missing values
    columns_with_missing = missing_values[missing_values > 0].index.tolist()
    metrics['Columns with missing values'] = columns_with_missing

    # Missing value counts per column
    missing_counts_per_column = missing_values[missing_values > 0].astype(int).to_dict()
    metrics['Missing value counts per column'] = missing_counts_per_column

    # Probability of missing values per column
    total_rows = len(data)
    probability_per_column = {col: (missing_counts_per_column[col] / total_rows) * 100 for col in columns_with_missing}
    metrics['Probability of missing values per column'] = probability_per_column

    return metrics
