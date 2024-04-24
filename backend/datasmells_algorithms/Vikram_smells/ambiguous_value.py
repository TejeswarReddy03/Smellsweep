import pandas as pd

# Function to detect ambiguous values in text columns
def detect_ambiguous_values(df):
    ambiguous_rows = []
    for index, row in df.iterrows():
        for col in df.columns:
            if pd.api.types.is_string_dtype(df[col]):
                if is_ambiguous(row[col]):
                    ambiguous_rows.append((index, col))  # Store both index and column name
                    break
    return ambiguous_rows

# Rule-based detection: Check if the text contains ambiguous keywords or non-numeric values in numeric columns
def is_ambiguous(text):
    ambiguous_keywords = ['unclear', 'vague', 'ambiguous', 'confusing', 'uninterpretable']
    if any(keyword in str(text).lower() for keyword in ambiguous_keywords):
        return True
    if isinstance(text, str) and not text.isdigit():
        return True
    return False

# Function to calculate metrics for ambiguous values
def ambiguous_value_metrics(df, ambiguous_rows):
    num_ambiguous = len(ambiguous_rows)
    ambiguous_percentage = (num_ambiguous / len(df)) * 100
    
    # Extract ambiguous attributes from ambiguous rows
    ambiguous_attributes = set(row[1] for row in ambiguous_rows)

    metrics = {
        'num_ambiguous_rows': num_ambiguous,
        'ambiguous_percentage': ambiguous_percentage,
        'ambiguous_attributes': list(ambiguous_attributes),  # Convert to list for JSON serialization
        'ambiguous_rows': ambiguous_rows
    }
    return metrics

# Function to identify ambiguous values
def ambiguous_values(df):
    ambiguous_rows = detect_ambiguous_values(df)
    if not ambiguous_rows:
        return "No ambiguous values detected in the dataset."
    else:
        metrics = ambiguous_value_metrics(df, ambiguous_rows)
        return metrics

# Example usage:
# df = pd.DataFrame({'Text': ['This is clear', 'This is vague', 'Confusing text', 'Not sure']})
# result = ambiguous_values(df)
# print(result)