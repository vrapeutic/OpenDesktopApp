import React, { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';
import csvParser from 'csv-parser';

const CSV = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = RNFS.DocumentDirectoryPath + '/your_file.csv';
        const csvData = await RNFS.readFile(path);

        // Parse CSV data
        const parsedData = [];
        csvData
          .split('\n') // Split CSV data into lines
          .filter(line => line.trim() !== '') // Filter out empty lines
          .forEach(line => {
            const values = line.split(',').map(value => value.trim());

            // Convert values to desired types
            const convertedValues = values.map((value, index) => {
              // Add your conversion logic here
              if (index === 2 || index === 4) {
                return parseFloat(value); // Convert to float
              } else {
                return value; // Keep other values as strings
              }
            });

            // Construct object from converted values
            const obj = {
              'Target Starting Time': convertedValues[0],
              'Target Hitting Time': convertedValues[1],
              'Interruption Durations': convertedValues[2],
              'Distractor Name': convertedValues[3],
              'Time Following It': convertedValues[4]
            };

            parsedData.push(obj);
          });

        setData(parsedData);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    {data.map((item, index) => (
      <div key={index}>{JSON.stringify(item)}</div>
    ))}
  </div>
  )
}

export default CSV
