from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
from datasmells_algorithms.suspect_sign_datasmell import identify_suspect_sign
from datasmells_algorithms.suspect_detection import assess_data_distribution
from datasmells_algorithms.amb_date_time import assess_ambiguous_date_formats
from datasmells_algorithms.contracting_datasmell import detect_contractions

app = Flask(__name__)
CORS(app)

def process_dataframe(df):
    try:
        # Call the identify_dummy_values function
        aggregated_metrics = {
            'suspect_sign': identify_suspect_sign(df),
            'suspect_detection': assess_data_distribution(df),
            'amb_d_t':assess_ambiguous_date_formats(df),
            'conte': detect_contractions(df),
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
            file_path = 'temp.csv'
            file.save(file_path)

            # Read the CSV file into a DataFrame
            df = pd.read_csv(file_path)

            # Check if the DataFrame has at least one column
            if df.empty or len(df.columns) == 0:
                return jsonify({'error': 'No columns to parse'})

            # Process the DataFrame and get metrics
            metrics = process_dataframe(df)

            # Optionally, you can delete the temporary file
            os.remove(file_path)

            return jsonify({'metrics': metrics})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)