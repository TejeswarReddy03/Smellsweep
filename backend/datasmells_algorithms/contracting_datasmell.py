import matplotlib
matplotlib.use("agg")
import pandas as pd
import re
import matplotlib.pyplot as plt
import base64
from io import BytesIO


def detect_contractions(data):
    # Ensure the DataFrame is not empty
    if data.empty:
        raise ValueError("DataFrame is empty.")

    # Initialize variables for metrics
    total_data_points = len(data)
    contractions_count = 0
    contractions_distribution = {}
    impact_on_analysis = ""

    # Define a regular expression pattern to find contractions
    contraction_pattern = re.compile(r"\b(?:\w*'\w*)\b")

    # Initialize lists to store x and y values for plotting
    x_values = []
    y_values = []

    # Iterate through columns and analyze contractions
    for i, column in enumerate(data.columns, start=1):
        if data[column].dtype == 'O':  # Check if the column contains text data
            column_label = f"Column {i}"
            for text in data[column]:
                if re.search(contraction_pattern, str(text)):
                    contractions_count += 1

                    # Analyze distribution of contractions
                    contractions_distribution[column_label] = contractions_distribution.get(column_label, 0) + 1

                    # Assess impact on analysis (qualitative)
                    if 'positive' in str(text).lower() and 'negative' in str(text).lower():
                        impact_on_analysis = "Contractions may introduce ambiguity in sentiment analysis."

            # Store x and y values for plotting for this specific column
            x_values.append(column_label)
            y_values.append(contractions_distribution.get(column_label, 0))  # Using get to handle cases where there are no contractions

    # Calculate percentage of data points containing contractions per attribute
    percentage_contractions_per_attribute = {
        column_label: (contractions_distribution.get(column_label, 0) / total_data_points) * 100
        for column_label in contractions_distribution
    }

    # Plot a bar chart for column vs. contractions
    plt.figure(figsize=(12, 6))
    plt.bar(x_values, y_values, color='skyblue')
    plt.title('Number of Contractions Data Smell in Each Column')
    plt.xlabel('Columns')
    plt.ylabel('Number of Contractions Data Smell')

    # Set the tick labels to custom column labels
    plt.xticks(rotation=45)

    # Convert the plot to base64 encoding
    image_stream = BytesIO()
    plt.savefig(image_stream, format='png')
    image_base64 = base64.b64encode(image_stream.getvalue()).decode('utf-8')

    # Close the plot to free up resources
    plt.close()

    # Create a dictionary to store the analysis results
    contraction_stats = {
        'Number of data points containing contractions': contractions_count,
        'Percentage of data points containing contractions per attribute': percentage_contractions_per_attribute,
        'Distribution of contractions': contractions_distribution,
        'Impact on analysis (qualitative)': impact_on_analysis,
        'Plot': image_base64,
        'X_values': x_values,  # Include x values for plotting
        'Y_values': y_values   # Include y values for plotting
    }

    return contraction_stats