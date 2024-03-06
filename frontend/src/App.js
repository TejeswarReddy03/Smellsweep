import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import axios from 'axios';
import './App.css';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null);

  const handleOnDrop = async (data, fileInfo) => {
    setLoading(true);
    if (fileInfo.type === 'text/csv' || fileInfo.name.endsWith('.csv')) {
      setCsvData(data);
      setErrorMessage('');
      sendFileToBackend(data);
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

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Backend Response:', response.data);
      setBackendResponse(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const displayMetrics = (dataSmell, metrics) => {
    if (!dataSmell || !metrics) {
      return <p>No metrics available.</p>;
    }

    return (
      <div>
        <h2>Data Smell: {dataSmell}</h2>
        <ul>
          {Object.entries(metrics).map(([metricName, metricValue]) => (
            <li key={metricName}>
              <b>{metricName}</b>: {metricValue}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <CSVReader
        onFileLoaded={handleOnDrop}
        parserOptions={{ header: true }}
      />
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <div className="table-container">
        {csvData.length > 0 && (
          <>
            <h2>Uploaded CSV Data</h2>
            <table className="csv-table">
              {/* ... (existing code) */}
            </table>
          </>
        )}

        {backendResponse && (
          <>
            <h2>Data Smells and Metrics</h2>
            {displayMetrics(backendResponse.data_smell, backendResponse.metrics)}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
