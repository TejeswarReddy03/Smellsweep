import pandas as pd
import numpy as np

def extreme_values_metrics(df, threshold=1.5):
    numerical_columns = df.select_dtypes(include=['number']).columns
    metrics = {}

    for col in numerical_columns:
        z_scores = (df[col] - df[col].mean()) / df[col].std()
        extreme_indices = np.where(np.abs(z_scores) > threshold)[0]
        metrics[col] = {
            'num_extreme_values': len(extreme_indices),
            'extreme_indices': extreme_indices.tolist()
        }

    if all(metrics[col]['num_extreme_values'] == 0 for col in metrics):
        return "There are no extreme values in the dataset using z-score method with the given threshold.\n"
    else:
        return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = extreme_values_metrics(df, threshold=3)
# print(metrics)
