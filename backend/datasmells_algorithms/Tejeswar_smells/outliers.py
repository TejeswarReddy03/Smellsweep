import pandas as pd
import numpy as np

def detect_outliers(df):
    outliers_info = ""

    for col in df.columns:
        if df[col].dtype == np.float64 or df[col].dtype == np.int64:
            mean = df[col].mean()
            std = df[col].std()

            # Define the threshold for outliers (you can customize this)
            lower_threshold = mean - 3 * std
            upper_threshold = mean + 3 * std

            # Find outliers indices
            outliers_indices = df[(df[col] < lower_threshold) | (df[col] > upper_threshold)].index.tolist()

            # Count number of outliers
            num_outliers = len(outliers_indices)

            # Calculate percentage of outliers
            percentage_outliers = (num_outliers / df.shape[0]) * 100

            outliers_info += f"Column: {col}\n"
            outliers_info += f"Number of outliers: {num_outliers}\n"
            outliers_info += f"Percentage of outliers: {round(percentage_outliers, 2)}%\n"
            outliers_info += f"Indices of outliers: {outliers_indices[:min(20, len(outliers_indices))]} \n\n"

    if not outliers_info:
        outliers_info = "No outliers detected in the dataset."

    return outliers_info

# Example usage:
# outliers_info = detect_outliers(your_dataframe)
# print(outliers_info)
