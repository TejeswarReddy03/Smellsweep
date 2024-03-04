import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import axios from 'axios'; // Import Axios for making HTTP requests
import './App.css'; // Import your CSS file for styling

function App() {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null);

  const handleOnDrop = (data, fileInfo) => {
    setLoading(true);
    if (fileInfo.type === 'text/csv' || fileInfo.name.endsWith('.csv')) {
      setCsvData(data);
      setErrorMessage('');
      sendFileToBackend(data); // Send the CSV file to the backend
    } else {
      setCsvData([]);
      setErrorMessage('Invalid file format. Please upload a CSV file.');
      setLoading(false);
    }
  };

  const sendFileToBackend = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([data], { type: 'text/csv' }), 'filename.csv');

      const response = await axios.post(' http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setBackendResponse(response.data); // Store the backend response in state
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <CSVReader
        onFileLoaded={handleOnDrop}
        parserOptions={{ header: true }}
      />
      {loading && <p>Loading...</p>} {/* Conditionally render "Loading..." text */}
      {errorMessage && <p>{errorMessage}</p>}
     
      <div className="table-container">
        {csvData.length > 0 && (
          <>
            <h2>Uploaded CSV Data</h2>
            <table className="csv-table">
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {backendResponse && (
          <>
            <h2>Backend Response</h2>
            <table className="response-table">
              <thead>
                <tr>
                  {Object.keys(backendResponse).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(backendResponse).map((value, index) => (
                    <td key={index}>{JSON.stringify(value)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
