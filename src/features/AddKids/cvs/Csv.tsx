import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse'; // Import PapaParse for parsing CSV files
import csvData from './testFile.csv';


function CSVReader() {
  const [data, setData] = useState<any[]>([]); // State to hold parsed CSV data

  useEffect(() => {
    parseCSV(csvData); // Parse CSV data when the component mounts
  }, []);

  const parseCSV = (data: string) => {
    parse(data, {
      header: true, // Treat the first row as a header
      complete: (parsedData:any) => {
        setData(parsedData.data); // Store parsed CSV data in state
      },
      error: (error:any) => {
        console.error('Error parsing CSV:', error);
      }
    });
  };

  return (
    <div>
      {/* Render the parsed CSV data */}
      {data.map(({row, index}:{row:any, index:any}) => (
        <div key={index}>
          {Object.values(row).map(({value, index}:any) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CSVReader;
