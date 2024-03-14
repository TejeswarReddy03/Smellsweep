import pandas as pd
import numpy as np

# To check for extreme values in the dataset using z-score
def extreme_values(df, threshold=1.5):
    instr = ''
    numerical_columns = df.select_dtypes(include=['number']).columns
    extreme_vals = pd.DataFrame(columns=numerical_columns)

    for col in numerical_columns:
        z_scores = (df[col] - df[col].mean()) / df[col].std()
        extreme_vals[col] = df[col][np.abs(z_scores) > threshold]

    if extreme_vals.empty:
        instr += "There are no extreme values in the dataset using z-score method with the given threshold.\n"
    else:
        instr += "Extreme values are present in the dataset using z-score method with the given threshold.\n"
        instr += "Number of extreme values: " + str(extreme_vals.count().sum()) + "\n"
        instr += "Indices of extreme values:\n"
        instr += str(extreme_vals.index.tolist()) + "\n"

    return instr

# Example usage:
# Assuming 'df' is your DataFrame
# instr = extreme_values(df, threshold=3)
# print(instr)
