import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import './App.css'; // Import your CSS file for styling

function App() {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnDrop = (data, fileInfo) => {
    setLoading(true);
    if (fileInfo.type === 'text/csv' || fileInfo.name.endsWith('.csv')) {
      setCsvData(data);
      setErrorMessage('');
    } else {
      setCsvData([]);
      setErrorMessage('Invalid file format. Please upload a CSV file.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <CSVReader
        onFileLoaded={handleOnDrop}
        parserOptions={{ header: true }}
      />
      {loading && <p>Loading...</p>} {/* Conditionally render "Loading..." text */}
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="table-container">
          {csvData.length > 0 ? (
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
          ) : (
            <p>No CSV file loaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
