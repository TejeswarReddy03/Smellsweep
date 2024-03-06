# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from dummy_values_detector import detect_dummy_values

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

            # Specify the dummy value used in your dataset
            dummy_value = 0  # Replace with the actual dummy value in your dataset

            # Detect dummy values using the separate file
            result = detect_dummy_values(file_path, dummy_value)

            # Optionally, you can delete the temporary file
            # import os
            # os.remove(file_path)

            return jsonify(result)
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
