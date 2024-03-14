import matplotlib
matplotlib.use("agg")
import matplotlib.pyplot as plt
import pandas as pd
from scipy.stats import chi2_contingency
import base64
from io import BytesIO

def assess_data_distribution(data):
    """
    Description: Assess whether the data distribution deviates significantly from the expected pattern.
    
    Metrics:
    - Chi-square test statistic and p-value
    - Visualization of the distribution (histograms or box plots) as base64-encoded strings
    - Impact on analysis (qualitative)
    
    Parameters:
    - data: DataFrame, input data
    
    Returns:
    - metrics: dictionary containing assessment results
    """
    # Create metrics dictionary to store results
    metrics = {
        'Chi-square test': {
            'test_statistic': None,
            'p_value': None
        },
        'plot_base64': None,
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Loop through columns for Chi-square test
    for column in data.columns:
        # Convert the column to a string or categorical type
        data[column] = data[column].astype(str)

        # Create contingency table for the Chi-square test
        observed_values = pd.crosstab(index=data[column], columns='count').values.flatten()
        
        # Perform Chi-square test without specifying expected distribution
        chi2_stat, p_value, _, _ = chi2_contingency([observed_values])

        # Store Chi-square test results
        metrics['Chi-square test']['test_statistic'] = chi2_stat
        metrics['Chi-square test']['p_value'] = p_value

        # Visualization of the distribution (histogram) as base64-encoded string
        plt.figure(figsize=(8, 6))
        plt.hist(data[column], bins=30, color='skyblue', edgecolor='black')
        plt.title(f'Distribution of {column}')
        plt.xlabel(column)
        plt.ylabel('Frequency')

        # Save the plot as a base64-encoded string
        buf = BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plot_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close()

        metrics['plot_base64'] = plot_base64

        # Assess impact on analysis qualitatively (example: mention potential skewness or outliers)
        # You may modify this part based on specific analysis or model considerations
        metrics['Impact on analysis (qualitative)'] = "Potential impact on regression models due to skewness."

    return metrics
