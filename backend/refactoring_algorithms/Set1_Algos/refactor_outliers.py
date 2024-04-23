import pandas as pd
import numpy as np

def replace_outliers_with_mean(df):
    """
    Replace outliers in a DataFrame with the mean of the column.

    Parameters:
    df (DataFrame): The input DataFrame.

    Returns:
    df (DataFrame): DataFrame with outliers replaced by mean.
    """

    for col in df.columns:
        if df[col].dtype == np.float64 or df[col].dtype == np.int64:
            mean = df[col].mean()
            std = df[col].std()

            lower_threshold = mean - 3 * std
            upper_threshold = mean + 3 * std

            # Replace outliers with the mean of the column
            df[col] = np.where((df[col] < lower_threshold) | (df[col] > upper_threshold), mean, df[col])

    return df

# Load your CSV file
# df = pd.read_csv('your_data.csv')

# Call the function to replace outliers with mean
# df_cleaned = replace_outliers_with_mean(df)

# Save the updated DataFrame to a new CSV file
# df_cleaned.to_csv('cleaned_data.csv', index=False)
