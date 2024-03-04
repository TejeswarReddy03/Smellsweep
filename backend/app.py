from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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

            # Process the DataFrame as needed
            # For example, you can perform data cleaning, analysis, etc.

            # Optionally, you can delete the temporary file
            # import os
            # os.remove(file_path)

            return jsonify({'message': 'File uploaded successfully', 'dataframe': df.to_dict()})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
