import pandas as pd
from scipy.stats import chi2_contingency

def detect_and_refactor_suspect_distribution(data):
    """
    Description: Detect and refactor suspected distributions in the DataFrame by replacing them with ****.

    Parameters:
    - data: DataFrame, input data

    Returns:
    - refactored_data: DataFrame with suspected distributions replaced by ****
    """
    refactored_data = data.copy()

    # Loop through columns
    for column in data.columns:
        # Create contingency table for the Chi-square test
        observed_values = pd.crosstab(index=data[column].astype(str), columns='count').values.flatten()
        
        # Perform Chi-square test without specifying expected distribution
        chi2_stat, p_value, _, _ = chi2_contingency([observed_values])

        # If p-value of Chi-square test is below significance level, replace data with ****
        if p_value < 0.5:
            refactored_data[column] = '****'

    return refactored_data
