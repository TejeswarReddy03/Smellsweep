import pandas as pd
import numpy as np

def detect_outliers(df):
    outliers_info = ""
    keys=[]
    values=[]

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
            keys.append(col)
            values.append(num_outliers)
            outliers_info += f"Column: {col}\n"
            outliers_info += f"Number of outliers: {num_outliers}\n"
            outliers_info += f"Percentage of outliers: {round(percentage_outliers, 2)}%\n"
            outliers_info += f"Indices of outliers: {outliers_indices[:min(20, len(outliers_indices))]} \n\n"

    if not outliers_info:
        outliers_info = "No outliers detected in the dataset."
    plot_outliers_distribution(keys,values)
    return keys,values

import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt

def plot_outliers_distribution(keys,values):
    # Plotting the histogram
    fig, ax = plt.subplots(figsize=(10, 6))

    # Extracting keys and values from the metrics dictionary
    chars = list(keys)
    values = list(values)

    # Plotting the histogram
    ax.bar(chars, values, color='skyblue')
    ax.set_ylabel('number of outliers')
    ax.set_xlabel('column name')
    ax.set_title('Histogram of Metrics')

   

    # Rotate x-axis labels for better visibility
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    # Save the figure as an image file
    plt.savefig('./histogram_outliers.png')