# import pandas as pd
# import re

# def remove_special_characters(data, column_name):
#     # Define regular expression to match non-alphanumeric characters

#     regex_special_chars = re.compile(r'[^a-zA-Z0-9\s]+')

#     # Refactor special characters in the specified column
#     data[column_name] = data[column_name].apply(lambda x: re.sub(regex_special_chars, '', str(x)))

#     return data
import pandas as pd
import re

def remove_special_characters(data, column_names):
    # Split the comma-separated column names into a list
    columns = [col.strip() for col in column_names.split(',')]

    # Define regular expression to match non-alphanumeric characters
    regex_special_chars = re.compile(r'[^a-zA-Z0-9\s]+')

    # Refactor special characters in the specified columns
    for column_name in columns:
        if column_name in data.columns:
            data[column_name] = data[column_name].apply(lambda x: re.sub(regex_special_chars, '', str(x)))

    return data
