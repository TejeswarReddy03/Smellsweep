from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
from datasmells_algorithms.suspect_sign_datasmell import identify_suspect_sign
from datasmells_algorithms.suspect_detection import assess_data_distribution
from datasmells_algorithms.amb_date_time import assess_ambiguous_date_formats
from datasmells_algorithms.contracting_datasmell import detect_contractions

from datasmells_algorithms.Vikram_smells.duplicate_value import detect_and_report_duplicate_data
from datasmells_algorithms.Vikram_smells.missing_value import detect_and_report_missing_data_metrics
from datasmells_algorithms.Vikram_smells.extreme_value import extreme_values_metrics
from datasmells_algorithms.Vikram_smells.mis_spelling import detect_misspelling_data_smell_metrics
from datasmells_algorithms.Vikram_smells.suspectclass_value import detect_and_report_suspect_class_values_metrics
from datasmells_algorithms.Vikram_smells.casing_value import detect_and_report_casing_data_smells
from datasmells_algorithms.Vikram_smells.longdata_value import detect_and_report_long_data_values_metrics
from datasmells_algorithms.Vikram_smells.ambiguous_value import detect_ambiguous_values


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

from datasmells_algorithms.Sivasai_smells.inconsistent import identify_data_type_inconsistency
from datasmells_algorithms.Sivasai_smells.missing_value_inconsistency import identify_missing_value_inconsistency
from datasmells_algorithms.Sivasai_smells.missing_value_refactoring import missingvalue_refactor_data
from datasmells_algorithms.Sivasai_smells.seperatingsmell import identify_separating_smell
from datasmells_algorithms.Sivasai_smells.seperatingsmell_refactor import separating_smell_refactor_data
from datasmells_algorithms.Sivasai_smells.spacingsmells import identify_spacing_smell
from datasmells_algorithms.Sivasai_smells.spacingsmell_refactor import spacing_smell_refactor_data
from datasmells_algorithms.Sivasai_smells.specialcharactersmell import identify_special_characters_inconsistency
from datasmells_algorithms.Sivasai_smells.unitinconsistency import identify_unit_inconsistency
from datasmells_algorithms.Sivasai_smells.unitrefactor import refactor_unit_inconsistency
app = Flask(__name__)
CORS(app)

def process_dataframe(df,csv_file):
    try:
        # Call the identify_dummy_values function
        aggregated_metrics = {
            
            
            # 'suspect_sign': identify_suspect_sign(df),
            # 'suspect_detection': assess_data_distribution(df),
            # 'amb_d_t':assess_ambiguous_date_formats(df),
            # 'conte': detect_contractions(df),
            #  'dummy_values':  identify_dummy_values(df),
             
             
             
            # 'suspect_character_encoding':detect_suspect_encoding(csv_file),
            # 'date_time_smell':detect_datetime_smell(df),


            #  'date_time_smell':detect_datetime_smell(df),
            # 'float_as_string':detect_float_as_string(df),
            # 'integer_as_float':detect_integer_as_float(df),
            #  'integer_as_string':detect_integer_as_string(df),


          

            # 'date_time_smell':detect_datetime_smell(df),


            # 'outliers':detect_outliers(df),
            # 'empty_strings':detect_and_analyze_empty_strings_rule_based(df),
            
            
            # 'v1':detect_and_report_duplicate_data(df),
            # 'v2':detect_and_report_missing_data_metrics(df),
            # 'v3':extreme_values_metrics(df),
            # 'v4':detect_misspelling_data_smell_metrics(df),
            # 'v5':detect_and_report_suspect_class_values_metrics(df),
            # 'v6':detect_and_report_casing_data_smells(df),
            # 'v7':detect_and_report_long_data_values_metrics(df),
            # 'v8':detect_ambiguous_values(df),
            
            
            
            
            
            
            
            
            
            
            # 'unnecessary_char':detect_and_analyze_unnecessary_characters(df),
            ###### 'incosistent_unit':detect_and_analyze_units_rule_based(df),
            # 'incosistent_unit':detect_and_analyze_units_rule_based(df),


            
            


            # 'inconsistent':identify_data_type_inconsistency(df),
            # 'minconsistency':identify_missing_value_inconsistency(df),
            # 'minconsisrefactor':missingvalue_refactor_data(df),
            # 'seperatingsmell':identify_separating_smell(df),
            # 'seperatingrefactor':separating_smell_refactor_data(df),
            # 'spacingsmell':identify_spacing_smell(df),
            # 'spacingrefactor':spacing_smell_refactor_data(df),
            # 'specialchar':identify_special_characters_inconsistency(df),
            'unitinconsistency':identify_unit_inconsistency(df),
            'unitrefactor':refactor_unit_inconsistency(df),

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
            # print(metrics)
            return jsonify({'metrics': metrics})
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)