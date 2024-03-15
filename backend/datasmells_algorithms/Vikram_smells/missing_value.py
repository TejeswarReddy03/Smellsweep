import pandas as pd

def detect_and_report_missing_data_metrics(data):
    # Initialize metrics dictionary to store results
    metrics = {
        'columns_with_missing': [],
        'missing_counts_per_column': [],
        'probability_per_column': []
    }

    # Detect missing data points
    missing_values = data.isnull().sum()
    total_missing = missing_values.sum()

    # Columns with missing values
    columns_with_missing = missing_values[missing_values > 0].index.tolist()

    # Missing value counts per column
    missing_counts_per_column = missing_values[missing_values > 0].astype(int).tolist()

    # Probability of missing values per column
    total_rows = len(data)
    probability_per_column = [(missing_count / total_rows) * 100 for missing_count in missing_counts_per_column]

    # Update metrics dictionary
    metrics['columns_with_missing'] = columns_with_missing
    metrics['missing_counts_per_column'] = missing_counts_per_column
    metrics['probability_per_column'] = probability_per_column
    
    return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = detect_and_report_missing_data_metrics(df)
# print(metrics)
