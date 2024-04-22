import pandas as pd
import numpy as np

def refactor_extreme_values(df, threshold=1.5):
    numerical_columns = df.select_dtypes(include=['number']).columns
    metrics = {
        'column': [],
        'num_extreme_values': [],
        'extreme_indices': [],
        'refactored_data': {}
    }

    for col in numerical_columns:
        z_scores = (df[col] - df[col].mean()) / df[col].std()
        extreme_indices = np.where(np.abs(z_scores) > threshold)[0]
        metrics['column'].append(col)
        metrics['num_extreme_values'].append(len(extreme_indices))
        metrics['extreme_indices'].append(extreme_indices.tolist())

        # Refactor extreme values
        refactored_data_col = df[col].copy()  # Copy the column to avoid modifying the original data
        refactored_data_col[extreme_indices] = np.nan  # Replace extreme values with NaN
        metrics['refactored_data'][col] = refactored_data_col

    if all(num == 0 for num in metrics['num_extreme_values']):
        return "There are no extreme values in the dataset using z-score method with the given threshold.\n"
    else:
        return metrics

# Example usage:
# Assume 'df' is your DataFrame
# metrics = extreme_values_metrics(df, threshold=3)
# print(metrics)
