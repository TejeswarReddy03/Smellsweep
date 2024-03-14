import pandas as pd
import numpy as np

# Function to detect ambiguous values in text columns
def detect_ambiguous_values(df):
    ambiguous_rows = []
    for index, row in df.iterrows():
        for col in df.columns:
            if pd.api.types.is_string_dtype(df[col]):
                if is_ambiguous(row[col]):
                    ambiguous_rows.append(index)
                    break
    return ambiguous_rows

# Rule-based detection: Check if the text contains ambiguous keywords
def is_ambiguous(text):
    ambiguous_keywords = ['unclear', 'vague', 'ambiguous', 'confusing', 'uninterpretable']
    for keyword in ambiguous_keywords:
        if keyword in text.lower():
            return True
    return False

# Function to calculate metrics for ambiguous values
def ambiguous_value_metrics(df, ambiguous_rows):
    num_ambiguous = len(ambiguous_rows)
    ambiguous_percentage = (num_ambiguous / len(df)) * 100
    ambiguous_columns = df.columns[df.isin(ambiguous_rows).any()]
    num_ambiguous_columns = len(ambiguous_columns)

    metrics = {
        'num_ambiguous_rows': num_ambiguous,
        'ambiguous_percentage': ambiguous_percentage,
        'ambiguous_columns': ambiguous_columns.tolist(),
        'num_ambiguous_columns': num_ambiguous_columns
    }
    return metrics

# Example usage:
# Assuming 'df' is your DataFrame
# df = pd.DataFrame({'Text': ['This is clear', 'This is vague', 'Confusing text', 'Not sure']})
# ambiguous_rows = detect_ambiguous_values(df)
# metrics = ambiguous_value_metrics(df, ambiguous_rows)
# print(metrics)

# Now, integrate these functions into the existing extreme_values function
def ambiguous_values(df):
    ambiguous_rows = detect_ambiguous_values(df)
    if not ambiguous_rows:
        return "No ambiguous values detected in the dataset."
    else:
        metrics = ambiguous_value_metrics(df, ambiguous_rows)
        return metrics

# Example usage:
# instr = ambiguous_values(df)
# print(instr)
