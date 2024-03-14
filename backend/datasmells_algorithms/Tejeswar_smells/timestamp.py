import pandas as pd

def detect_timestamp_inconsistency(dataframe, timestamp_format='%m/%d/%Y %H:%M:%S'):
    print("Original DataFrame:")
    print(dataframe.to_string(index=False))  # Convert DataFrame to string representation without index

    inconsistency_metrics = analyze_timestamp_inconsistency(dataframe, timestamp_format)

    if inconsistency_metrics:
        print("\nTimestamp Inconsistency Metrics:")
        for metric, value in inconsistency_metrics.items():
            print(f"{metric}: {value}")
    else:
        print("\nNo timestamp inconsistency detected.")

def analyze_timestamp_inconsistency(dataframe, timestamp_format):
    min_timestamps = []
    max_timestamps = []
    inconsistent_count = 0

    # Iterate through each cell in the DataFrame
    for col in dataframe.columns:
        for index, value in dataframe[col].items():
            if pd.notna(value):
                try:
                    timestamp = pd.to_datetime(value, format=timestamp_format)
                    min_timestamps.append(timestamp)
                    max_timestamps.append(timestamp)
                except (ValueError, TypeError):
                    inconsistent_count += 1

    # Calculate metrics based on timestamps
    inconsistency_metrics = {}
    if min_timestamps and max_timestamps:
        inconsistency_metrics['Minimum Timestamp'] = min(min_timestamps)
        inconsistency_metrics['Maximum Timestamp'] = max(max_timestamps)
        inconsistency_metrics['Timestamp Range'] = max(max_timestamps) - min(min_timestamps)
    inconsistency_metrics['Inconsistent Timestamps'] = inconsistent_count

    return inconsistency_metrics
