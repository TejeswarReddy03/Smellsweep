import csv
from io import TextIOWrapper

def detect_suspect_encoding(csv_file):
    """
    Detects potential character encoding issues in a CSV file.
    """
    try:
        # Wrap the file object with TextIOWrapper to handle encoding
        print("hi   d")
        csv_contents = TextIOWrapper(csv_file, encoding='utf-8')
        print("hi   d")
        # Read the CSV contents using the csv.reader
        reader = csv.reader(csv_contents)
        
        # Iterate over rows in the CSV file
        for row in reader:
            # Perform any necessary processing on the data
            pass
        
        return {"status":"No encoding issues detected."}
    except UnicodeDecodeError:
       return {"status":"Suspect character encoding detected. UTF-8 cannot decode the contents of the CSV file."}


