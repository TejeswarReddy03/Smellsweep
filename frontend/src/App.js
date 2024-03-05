import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; 
import './App.css'; 

function App() {
  const [csvData, setCsvData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000); // Updated rows per page
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null);
  const [pageInput, setPageInput] = useState(''); // New state for page input

  useEffect(() => {
    if (csvData.length === 0) return;

    const fetchBackendData = async () => {
      setLoading(true);
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const slicedData = csvData.slice(start, end);
      setLoading(false);
    };

    fetchBackendData();
  }, [currentPage, csvData, rowsPerPage]);

  const handleFileUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        parseCSV(file);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid file format. Please upload a CSV file.');
        setLoading(false);
      }
    } else {
      setErrorMessage('No file selected.');
      setLoading(false);
    }
  };
  
  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
        sendFileToBackend(result.data); // Call sendFileToBackend after setting CSV data
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setErrorMessage('Error parsing CSV. Please try again.');
        setLoading(false);
      },
    });
  };

  const sendFileToBackend = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([Papa.unparse(data)], { type: 'text/csv' }), 'filename.csv');

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setBackendResponse(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  const totalPages = Math.ceil(csvData.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageInputChange = (event) => {
    setPageInput(event.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      setErrorMessage('Invalid page number.');
    }
    setPageInput('');
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
     
      <div className="table-container">
        <h2>Uploaded CSV Data</h2>
        <table className="csv-table">
          <thead>
            <tr>
              <th>S.No.</th>
              {Object.keys(csvData[0] || {}).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((row, index) => {
                const serialNumber = (currentPage - 1) * rowsPerPage + index + 1;
                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {pageNumbers.map(number => {
          if (number === 1 || number === totalPages || (number >= currentPage - 6 && number <= currentPage + 7)) {
            return (
              <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                {number}
              </button>
            );
          } else if (number === currentPage - 7 || number === currentPage + 8) {
            return (
              <span key={number}>...</span>
            );
          }
          return null;
        })}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
      </div>

      <div className="page-input">
        <input type="text" value={pageInput} onChange={handlePageInputChange} placeholder="Enter page number" />
        <button onClick={handleGoToPage}>Go</button>
      </div>

      <div className="backend-container">
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
