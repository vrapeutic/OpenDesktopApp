import React, { useState, useEffect } from 'react';
import csvData from './testFile.csv';

function CSVReader() {

  useEffect(() => {
    parseCSV(csvData);
  }, []);

  const parseCSV = (data) => {
    // Use the csv-parser package or custom parsing logic to parse the CSV data
    const results = [];
    // Parse the CSV data and store it in the results array
    console.log(results);
  };

  return (
    <div>
      {/* Render the CSV data */}
      {csvData.map((row, index) => (
        <div key={index}>
          {Object.values(row).map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CSVReader;