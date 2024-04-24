import pandas as pd

def refactor_data(data):
    cleaned_data = data.copy()
    
    # Loop through columns to check for '-' signs
    for column in cleaned_data.columns:
        # Check if '-' exists in any cell of the column
        if cleaned_data[column].dtype == 'object':  # Check only for object dtype columns
            cleaned_data[column] = cleaned_data[column].apply(lambda x: x.replace('-', '') if isinstance(x, str) else x)
    
    return cleaned_data

# Example usage:
# df = pd.read_csv("your_dataset.csv")  # Assuming you have a CSV file containing your dataset
# cleaned_df = refactor_data(df)
# print(cleaned_df)
