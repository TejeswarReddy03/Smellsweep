import pandas as pd

def replace_empty_strings(dataframe):
    """
    
    Replace empty strings with mean if the type is int and with a high-frequency word if the type is string.

    Parameters:
    dataframe (DataFrame): The input DataFrame.

    Returns:
    cleaned_dataframe (DataFrame): DataFrame with empty strings replaced.
    
    """
    

    cleaned_dataframe = dataframe.copy()

    for col in cleaned_dataframe.columns:
        if cleaned_dataframe[col].dtype == 'int64':
            mean_value = cleaned_dataframe[col].mean()
            cleaned_dataframe[col] = cleaned_dataframe[col].replace("''", mean_value)
        elif cleaned_dataframe[col].dtype == 'object':
            # Replace empty strings with the most frequent word for string type columns
            most_frequent_word = cleaned_dataframe[col].mode()[0]
            cleaned_dataframe[col] = cleaned_dataframe[col].replace("''", most_frequent_word)

    return cleaned_dataframe

# Example usage:
# Load your DataFrame
# dataframe = pd.read_csv('your_data.csv')

# Replace empty strings
# cleaned_dataframe = replace_empty_strings(dataframe)
# Print or save the cleaned DataFrame
# print(cleaned_dataframe)
# cleaned_dataframe.to_csv('cleaned_data.csv', index=False)
