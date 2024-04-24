# import pandas as pd
# import re

# def separating_smell_refactor_data(data):

#     # Define regular expression for identifying numeric values with commas as separators
#     regex_numeric_with_commas = re.compile(r'(?<![\d.,-])[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?(?![\d.,-])')
#     regex_numeric_with_commas = re.compile(r'(?<![\d.,-])[+-]?(?:\d{1,3}(?:,\d{3})+|\d{1,3})(?:\.\d+)?(?![\d.,-])')


#     # Replace commas with periods in numeric cells
#     for column in data.columns:
#         # Check if the column contains numeric values
#         if pd.to_numeric(data[column], errors='coerce').notna().any():
#             # Convert numeric cells to string and replace commas with periods
#             data[column] = data[column].astype(str).apply(lambda x: regex_numeric_with_commas.sub(lambda match: match.group().replace(',', '.'), x))
    
#     refactored_json = data.to_json(orient='records')
#     print(data)
#     # Return JSON object
#     return refactored_json

# # Example usage
# data = pd.DataFrame({'column1': ["1,000", "2.5", "3,000", "4.5", "5"],
#                      'column2': ["60", "78", "80", "99", "100"],
#                      'column3': ["A", "B", "C", "D", "E"],
#                      'column4': ["3,2siva", "32feb", "43", "invalid", "5,5"]})

# refactored_data = separating_smell_refactor_data(data)
# print(refactored_data)
import pandas as pd
import re

def separating_smell_refactor_data(data):
    # Define regular expression for identifying cells with pure numbers or numbers followed by ',' or '.'
    regex_numeric_with_commas = re.compile(r'^\d+(?:[.,]\d+)?$')

    # Replace commas with periods in cells matching the pattern
    def replace_commas(cell):
        if isinstance(cell, str) and regex_numeric_with_commas.match(cell):
            return cell.replace(',', '.')
        return cell

    # Apply the replacement function to each cell in the DataFrame
    refactored_data = data.applymap(replace_commas)
    print(refactored_data)
    refactored_json = refactored_data.to_json(orient='records')
    # return refactored_json
    return refactored_data

# # Example usage
# data = pd.DataFrame({'column1': ["1,000", "2.5", "3,000", "4.5", "5"],
#                      'column2': ["60", "78", "80", "99", "100"],
#                      'column3': ["A", "B", "C", "D", "E"],
#                      'column4': ["3,2siva", "32feb", "43", "invalid", "5,5"]})

# refactored_data = separating_smell_refactor_data(data)
# print(refactored_data)
