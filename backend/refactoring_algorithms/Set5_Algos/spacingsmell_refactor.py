import pandas as pd
import re

def spacing_smell_refactor_data(data):
    
    # Define regular expression for detecting unusual patterns of spaces
    regex_spacing = re.compile(r'\s{2,}')

    # Replace multiple spaces with a single space in all columns
    refactored_data = data.applymap(lambda x: regex_spacing.sub(' ', str(x)))

    refactored_data_json = refactored_data.to_json(orient='records')
    print(refactored_data)
    # return refactored_data_json
    return refactored_data

    # return refactored_data

# # Example usage
# data = pd.DataFrame({'column1': ["This  is  a  test", "Another  example"],
#                      'column2': ["Data       with  spaces", "Yet   another   example"]})

# refactored_data = spacing_smell_refactor_data(data)
# print(refactored_data)
