import React from "react";
import "./Table.css";

const Table = ({ col1Arr, col2Arr, col1, col2, smellName }) => {
  if (col1Arr.length < 1) {
    return (
      <ul>
        <li>There are no {smellName}</li>
      </ul>
    );
  }
  return (
    <table className="myTable">
      <thead>
        <tr>
          <th>{col1}</th>
          <th>{col2}</th>
        </tr>
      </thead>
      <tbody>
        {col1Arr.map((col, index) => (
          <tr key={index}>
            <td>{col}</td>
            <td>{col2Arr[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
