import pandas as pd

def identify_dummy_values(data):
    dummy_value_rules = ["-999", "NULL"]

    # Create metrics dictionary to store results
    metrics = {
        'Number of data points with dummy values': 0,
        'Percentage of dummy values per attribute': {},
        'Distribution of dummy values': {},
        'Impact on analysis (qualitative)': "Not assessed"
    }

    # Loop through columns to check for dummy values
    for column in data.columns:
        # Check for dummy values using predefined rules and pd.isna()
        dummy_count = data[data[column].isin(dummy_value_rules) | pd.isna(data[column])].shape[0]
        dummy_percentage = (dummy_count / data.shape[0]) * 100

        metrics['Number of data points with dummy values'] += dummy_count
        metrics['Percentage of dummy values per attribute'][column] = dummy_percentage

        # Check distribution of dummy values
        dummy_distribution = data[data[column].isin(dummy_value_rules) | pd.isna(data[column])].groupby(column).size().to_dict()
        metrics['Distribution of dummy values'][column] = dummy_distribution

    # Update the impact on analysis based on your specific considerations
    # metrics['Impact on analysis (qualitative)'] = "To be assessed based on specific use case"
    plot_dummy_distribution(metrics)
    return metrics
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt

def plot_dummy_distribution(metrics):
    val = metrics["Number of data points with dummy values"]
    metrics = metrics["Percentage of dummy values per attribute"]

    # Plotting the histogram
    fig, ax = plt.subplots(figsize=(10, 6))

    ax.bar(metrics.keys(), metrics.values(), color='skyblue')
    ax.set_ylabel('number of dummy values')
    ax.set_xlabel('column name')
    ax.set_title('Histogram of Metrics')
    equation = "total number of dummy values are " + str(val)  # Convert val to string
    plt.text(0.5, 20, equation, fontsize=12, color='blue')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    # Save the figure as an image file
    plt.savefig('./histogram.png')
        