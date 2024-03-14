import matplotlib
matplotlib.use("agg")
import pandas as pd
import re
import matplotlib.pyplot as plt
import io
import base64

def identify_suspect_sign(data):
    suspect_signs_metrics = {
        'Number of data points with unexpected signs': 0,
        'Percentage of data points with unexpected signs per attribute': {},
        'Distribution of unexpected signs': {},
        'Domain knowledge validation (qualitative)': "Not assessed",
        'plot_base64': None  # Placeholder for the base64-encoded plot
    }

    # Loop through columns to check for suspect signs
    for column in data.columns:
        # Check for unexpected signs using a regular expression
        suspect_sign_count = sum(data[column].apply(lambda value: bool(re.match(r'^-', str(value)))))
        suspect_sign_percentage = (suspect_sign_count / len(data)) * 100

        suspect_signs_metrics['Number of data points with unexpected signs'] += suspect_sign_count
        suspect_signs_metrics['Percentage of data points with unexpected signs per attribute'][column] = suspect_sign_percentage

        # Check distribution of unexpected signs
        # This example assumes a simple distribution analysis
        # Adjust based on specific requirements
        unexpected_sign_distribution = data[data[column].apply(lambda value: bool(re.match(r'^-', str(value))))].groupby(column).size().to_dict()
        suspect_signs_metrics['Distribution of unexpected signs'][column] = unexpected_sign_distribution

    # Plotting the number of suspect signs per column
    plt.figure(figsize=(10, 6))
    plt.bar(suspect_signs_metrics['Percentage of data points with unexpected signs per attribute'].keys(), 
            suspect_signs_metrics['Percentage of data points with unexpected signs per attribute'].values())
    plt.xlabel('Column')
    plt.ylabel('Percentage of Data Points with Unexpected Signs')
    plt.title('Percentage of Data Points with Unexpected Signs per Column')
    plt.xticks(rotation=45)

    # Save plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    # Encode plot as base64 string
    plot_base64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()

    # Include base64-encoded plot in the metrics dictionary
    suspect_signs_metrics['plot_base64'] = plot_base64

    return suspect_signs_metrics
