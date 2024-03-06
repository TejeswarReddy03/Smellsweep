import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_unexpected_signs_metrics(csv_file_path):
    # Load CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file_path)

    # Extract the row names (assuming they are in the first column)
    row_names = df.iloc[:, 0]

    # Remove the row names from the DataFrame for anomaly detection
    df_values = df.iloc[:, 1:]

    # Initialize Isolation Forest
    isolation_forest = IsolationForest(contamination='auto', random_state=42)

    # Fit the model to the data
    anomalies = isolation_forest.fit_predict(df_values)

    # Identify rows with unexpected signs
    rows_with_unexpected_signs = row_names[anomalies == -1]

    # Metric: Number of data points with unexpected signs
    num_unexpected_signs = len(rows_with_unexpected_signs)

    # Metric: Percentage of data points with unexpected signs per attribute
    percentage_per_attribute = (df_values < 0).mean() * 100

    # Metric: Distribution of unexpected signs
    distribution_of_signs = df_values[rows_with_unexpected_signs.index].apply(lambda x: '+' if x > 0 else '-', axis=1).value_counts()

    return {
        "Number of data points with unexpected signs": num_unexpected_signs,
        "Percentage of data points with unexpected signs per attribute": percentage_per_attribute.to_dict(),
        "Distribution of unexpected signs": distribution_of_signs.to_dict(),
        "Rows with unexpected signs": list(rows_with_unexpected_signs)
    }
