import pandas as pd

def detect_integer_as_string(df):
    integer_as_string = {}  # Dictionary to store detected instances

    # Iterate through each column in the DataFrame
    for column in df.columns:
        # Check if the column contains any text strings that can be converted to integers
        integer_count = sum(value.isdigit() for value in df[column] if isinstance(value, str))
        total_rows = len(df[column])
        
        # Calculate the percentage of rows in the column that contain integers stored as strings
        if integer_count > 0:
            percentage = (integer_count / total_rows) * 100
            integer_as_string[column] = {
                'percentage': percentage,
                'rows_with_smell': integer_count
            }

    # Include status attribute
    status = bool(integer_as_string)  # True if any integer-as-string smells were detected, False otherwise
    return {'integer_as_string': integer_as_string, 'status': status}

# Example usage:
# data = {'IntegerColumn1': [1, '2', '3', '4', '5', '6', '7', '8', '9', '10'],
#         'IntegerColumn2': ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
#         'IntegerColumn3': [1, 2, 3, 4, "5", 6.346, 7, 8.0, 9, 10]}

# df = pd.DataFrame(data)
# print(df)
# print(df.dtypes)
# result = detect_integer_as_string(df)
# if result:
#     print("Data smell detected:")
#     for column, info in result['integer_as_string'].items():
#         print(f"Column '{column}': {info['percentage']:.2f}%, Rows with smell: {info['rows_with_smell']}")
# else:
#     print("No data smell detected.")
