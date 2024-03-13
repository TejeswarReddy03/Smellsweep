from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os


from datasmells_algorithms.SECTION3_SMELLS.suspect_character_encoding import detect_suspect_encoding
from datasmells_algorithms.SECTION3_SMELLS.date_time import detect_datetime_smell
from datasmells_algorithms.SECTION3_SMELLS.float_as_string import detect_float_as_string
from datasmells_algorithms.SECTION3_SMELLS.integer_as_float import detect_integer_as_float
from datasmells_algorithms.SECTION3_SMELLS.integer_as_string import detect_integer_as_string

from datasmells_algorithms.Tejeswar_smells.dummy_value import identify_dummy_values
from datasmells_algorithms.Tejeswar_smells.outliers import detect_outliers
from datasmells_algorithms.Tejeswar_smells.empty_strings import detect_and_analyze_empty_strings_rule_based
from datasmells_algorithms.Tejeswar_smells.unnecessary_character import detect_and_analyze_unnecessary_characters
# from datasmells_algorithms.Tejeswar_smells.inconsistent_unit import detect_and_analyze_units_rule_based



app = Flask(__name__)
CORS(app)

def process_dataframe(df,csv_file):
    try:
        # Call the identify_dummy_values function
        aggregated_metrics = {
            'dummy_values':  identify_dummy_values(df),
            #'suspect_character_encoding':detect_suspect_encoding(csv_file),
            # 'date_time_smell':detect_datetime_smell(df),
            'float_as_string':detect_float_as_string(df),
            # 'integer_as_float':detect_integer_as_float(df),
            # 'integer_as_string':detect_integer_as_string(df),

            'outliers':detect_outliers(df),
            'empty_strings':detect_and_analyze_empty_strings_rule_based(df),
            # 'timestamps':detect_timestamp_inconsistency(df,timestamp_format='%m/%d/%Y %H:%M:%S'),
            
            
            
            'unnecessary_char':detect_and_analyze_unnecessary_characters(df),
            # 'incosistent_unit':detect_and_analyze_units_rule_based(df),
            
            

            # Add metrics from other algorithms here
        }

        # Optionally, you can include additional processing steps here
        # For example, data cleaning, analysis, etc.

        return aggregated_metrics
    except Exception as e:
        return {'error': str(e)}


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        try:
            # Save the uploaded file temporarily
            #csv_contents = file.read()
            print("in backend")
            # Call detect_suspect_encoding with CSV contents
            #encoding_status = detect_suspect_encoding(csv_contents)
            file_path = 'temp.csv'
            file.save(file_path)
            print("in backend before df ")
            # Read the CSV file into a DataFrame
            df = pd.read_csv(file_path)
            print("in backend after df ")
            # Check if the DataFrame has at least one column
            if df.empty or len(df.columns) == 0:
                return jsonify({'error': 'No columns to parse'})
            print("in backend beforecalling fun")
            # Process the DataFrame and get metrics
            metrics = process_dataframe(df,file)

            # Optionally, you can delete the temporary file
            os.remove(file_path)

            return jsonify({'metrics': metrics})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
