import pandas as pd
import re

def detect_datetime_smell(df):
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
            row_counts[col] = {
                'total_rows': total_rows,
                'mixed_type_rows': mixed_type_count,
                'unique_date_rows': unique_date_count,
                'unique_time_rows': unique_time_count
            }
            
            result[col] = {
                'mixed_type_percentage': mixed_type_percentage[col],
                'unique_date_percentage': unique_date_percentage[col],
                'unique_time_percentage': unique_time_percentage[col],
                'row_counts': row_counts[col]  # Include row counts in the result
            }
            result['processing_efficiency_gain'] = ((df.size - mixed_type_count) / df.size) * 100

    result['status'] = status  # Include status attribute

    return result
