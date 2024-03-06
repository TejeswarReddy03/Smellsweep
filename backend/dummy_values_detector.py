# dummy_values_detector.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

def train_model(df):
    # Assuming 'Label' is the target column
    X = df.drop('Label', axis=1)
    y = df['Label']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a random forest classifier
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)

    return clf

def evaluate_model(model, X_test, y_test):
    # Make predictions on the test set
    predictions = model.predict(X_test)

    # Evaluate the model
    accuracy = accuracy_score(y_test, predictions)
    conf_matrix = confusion_matrix(y_test, predictions)
    classification_rep = classification_report(y_test, predictions)

    return accuracy, conf_matrix, classification_rep

def detect_dummy_values(file_path, dummy_value):
    try:
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Calculate dummy metrics
        num_data_points, percentage_per_attribute, dummy_distribution = calculate_dummy_metrics(df, dummy_value)

        # Train the machine learning model
        model = train_model(df)

        # Assuming 'Label' is the target column
        X_test = df.drop('Label', axis=1)
        y_test = df['Label']

        # Evaluate the model
        accuracy, conf_matrix, classification_rep = evaluate_model(model, X_test, y_test)

        return {
            'success': True,
            'accuracy': accuracy,
            'confusion_matrix': conf_matrix.tolist(),
            'classification_report': classification_rep,
            'num_data_points_with_dummy_values': num_data_points,
            'percentage_dummy_values_per_attribute': percentage_per_attribute.to_dict(),
            'dummy_value_distribution': dummy_distribution.to_dict()
        }

    except Exception as e:
        return {'success': False, 'error': str(e)}

def calculate_dummy_metrics(df, dummy_value):
    # Number of data points with dummy values
    num_data_points = df[df == dummy_value].count().sum()

    # Percentage of dummy values per attribute
    percentage_per_attribute = (df == dummy_value).mean()

    # Distribution of dummy values
    dummy_distribution = df.groupby('Attribute')[df == dummy_value].count()

    return num_data_points, percentage_per_attribute, dummy_distribution
