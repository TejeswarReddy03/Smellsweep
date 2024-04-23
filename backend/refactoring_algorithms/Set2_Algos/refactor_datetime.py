import pandas as pd
import re
import numpy as np
def refactor_datetime_smell(df):
    result = {}
    columns_with_smell = []
    mixed_type_percentage = {}
    unique_date_percentage = {}
    unique_time_percentage = {}
    row_counts = {}  # Dictionary to store row counts
    status = False

    def has_date_and_time(value):
        pattern = r'\d{2}:\d{2}:\d{2} \d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'  
        return bool(re.match(pattern, str(value)))

    def has_only_time(value):
        pattern = r'^\d{2}:\d{2}:\d{2}$' 
        return bool(re.match(pattern, str(value)))

    for col in df.columns:
        if df[col].apply(has_date_and_time).any():
            status = True  # At least one datetime smell detected
            columns_with_smell.append(col)
            mixed_type_count = sum(df[col].apply(has_date_and_time))
            unique_time_count = sum(df[col].apply(has_only_time))
            unique_date_count = len(df) - mixed_type_count - unique_time_count
            total_rows = len(df)
            mixed_type_percentage[col] = (mixed_type_count / total_rows) * 100
            unique_date_percentage[col] = (unique_date_count / total_rows) * 100
            unique_time_percentage[col] = (unique_time_count / total_rows) * 100
            

          
            if mixed_type_percentage[col] < 21 and unique_time_percentage[col] == 0:
    # Convert mixed-type cells to date format using regex pattern
                df[col] = df[col].apply(lambda x: re.findall(r'\d{4}-\d{2}-\d{2}', str(x))[0] if has_date_and_time(x) else x)


            if mixed_type_percentage[col] < 21 and unique_date_percentage[col] == 0:
                # Extract time component from mixed-type cells manually using regex
                df[col] = df[col].apply(lambda x: re.findall(r'\d{2}:\d{2}:\d{2}', str(x))[0] if has_date_and_time(x) else x)

           
   
    return df


