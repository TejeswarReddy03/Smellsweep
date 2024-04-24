# import pandas as pd

# def missingvalue_refactor_data(data):
#     # Replace missing value indicators with NaN
#     missing_value_rules = ["-999", "NULL", "NaN", "N/A", "", "unknown", "missing", "Missing", "null", "Unknown"]
#     data.replace(missing_value_rules, pd.NA, inplace=True)
    
#     # Drop rows with all missing values
#     # data.dropna(how='all', inplace=True)
#     print(data)
#     return data
import pandas as pd
import numpy as np

def missingvalue_refactor_data(data):
    # Replace missing value indicators with NaN (case insensitive)
    missing_value_rules = ["-999", "NULL", "NaN", "N/A", "", "unknown", "missing", "Missing", "null", "Unknown","Null"]
    data.replace(missing_value_rules, np.NaN, inplace=True)
    
    # Drop rows with all missing values
    # data.dropna(how='all', inplace=True)
    
    # Convert DataFrame to JSON
    refactored_json = data.to_json(orient='records')
    print(data)
    # Return JSON object
    # return refactored_json
    return data



