import pandas as pd
import numpy as np
def sub_refactor_floats_to_int(df, column):
    # Convert the column to float to ensure that NaNs can be handled
    df.loc[:, column] = df.loc[:, column].astype(float)
    
    # Round the float values to the nearest integer
    df.loc[:, column] = df.loc[:, column].apply(lambda x: np.round(x) if pd.notnull(x) else x)
    
    # Fill NaN values with a default integer (e.g., 0)
    df.loc[:, column] = df.loc[:, column].fillna(0)
    
    # Convert the column to integer
    convert_dict = {column: int}
    df = df.astype(convert_dict)
    
    return df

def refactor_floats_to_int(df):
    #print("hi")
    #print(df.dtypes)
    for column in df.columns:
        if any(isinstance(value, (int, float)) for value in df[column]):
            count_float_represented_as_int = 0
            count_total_float = 0
            for value in df[column]:
                if isinstance(value, float):
                    count_total_float += 1
                    if value.is_integer():
                        count_float_represented_as_int += 1

            if count_total_float > 0:
                percentage = (count_float_represented_as_int / count_total_float) * 100
                if percentage > 80:  # If more than 90% values can be represented as integers
                    df = sub_refactor_floats_to_int(df, column)

    return df
