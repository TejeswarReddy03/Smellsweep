import pandas as pd
import numpy as np

def refactor_extreme_values(df, threshold=1.5, lower_percentile=5, upper_percentile=95):
    numerical_columns = df.select_dtypes(include=['number']).columns

    for col in numerical_columns:
        # Calculate lower and upper limits for Winsorization
        lower_limit = np.percentile(df[col].dropna(), lower_percentile)
        upper_limit = np.percentile(df[col].dropna(), upper_percentile)
        
        # Apply Winsorization only to extreme values
        df[col] = np.where(df[col] < lower_limit, lower_limit, df[col])
        df[col] = np.where(df[col] > upper_limit, upper_limit, df[col])

    return df

# Example usage:
# Assume 'df' is your DataFrame
# refactored_df = refactor_extreme_values_winsorization(df, lower_percentile=5, upper_percentile=95)
# print(refactored_df)
