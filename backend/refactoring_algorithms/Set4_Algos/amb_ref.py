import pandas as pd

# Function to refactor ambiguous values in the dataset with additional clarification
def refactor_ambiguous_values(df):
    refactored_df = df.copy()

    for index, row in refactored_df.iterrows():
        for col in refactored_df.columns:
            if pd.api.types.is_string_dtype(refactored_df[col]):
                if is_ambiguous(row[col]):
                    # Example: Add a prefix to provide clarification
                    clarification = "Clarified_" + row[col]
                    refactored_df.at[index, col] = clarification
    return refactored_df

# Rule-based detection: Check if the text contains ambiguous keywords or non-numeric values in numeric columns
def is_ambiguous(text):
    ambiguous_keywords = ['unclear', 'vague', 'ambiguous', 'confusing', 'uninterpretable']
    if any(keyword in str(text).lower() for keyword in ambiguous_keywords):
        return True
    if isinstance(text, str) and not text.isdigit():
        return True
    return False

# Function to refactor only ambiguous values in the DataFrame and return the refactored DataFrame
def refactor_ambiguous_values_only(df):
    return refactor_ambiguous_values(df)

# Example usage:
# df = pd.DataFrame({'Text': ['This is clear', 'This is vague', 'Confusing text', 'Not sure']})
# refactored_df = refactor_ambiguous_values_only(df)
# print(refactored_df)
