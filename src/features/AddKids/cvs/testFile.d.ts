// testFile.d.ts

// Define the structure of each row in the CSV file
interface CSVRow {
    id: number;
    name: string;
    // Add more properties as needed
  }
  
  // Declare the module representing the CSV file
  declare module 'testFile.csv' {
    const csvData: CSVRow[]; // Assuming the CSV file contains an array of CSVRow objects
    export default csvData;
  }
  