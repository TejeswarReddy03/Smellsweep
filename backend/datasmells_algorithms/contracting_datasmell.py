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

    # Iterate through columns and analyze contractions
    for column in data.columns:
        if data[column].dtype == 'O':  # Check if the column contains text data
            for text in data[column]:
                if re.search(contraction_pattern, str(text)):
                    contractions_count += 1

                    # Analyze distribution of contractions
                    contractions_distribution[column] = contractions_distribution.get(column, 0) + 1

                    # Assess impact on analysis (qualitative)
                    if 'positive' in str(text).lower() and 'negative' in str(text).lower():
                        impact_on_analysis = "Contractions may introduce ambiguity in sentiment analysis."

    # Calculate percentage of data points containing contractions per attribute
    percentage_contractions_per_attribute = {
        attribute: (contractions_distribution.get(attribute, 0) / total_data_points) * 100
        for attribute in contractions_distribution
    }

    # Plot a bar chart for column vs. contractions
    plt.figure(figsize=(12, 6))
    plt.bar(contractions_distribution.keys(), contractions_distribution.values(), color='skyblue')
    plt.title('Number of Contractions Data Smell in Each Column')
    plt.xlabel('Columns')
    plt.ylabel('Number of Contractions Data Smell')
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
        'Plot': image_base64
    }

    return contraction_stats

