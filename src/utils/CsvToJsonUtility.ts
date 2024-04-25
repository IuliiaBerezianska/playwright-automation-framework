import * as fs from 'fs';
import path from 'path';

/**
 * Converts a CSV string to a JSON array.
 * @param {string} data - The CSV data to convert.
 * @param {string} delimiter - The delimiter used in the CSV data (default is ',').
 * @returns {Object[]} - An array of objects representing the CSV data.
 */
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce((obj, title, index) => {
        const trimmedTitle = title.trim();
        const trimmedValue = values[index] ? values[index].trim() : ''; // Check if values[index] is defined
        obj[trimmedTitle] = trimmedValue;
        return obj;
      }, {});
    });
};



//   console.log(CSVToJSON('col1,col2\na,b\nc,d'));
// Example usage

// Get the current directory
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, '..');
// Set the directory path for the 'testData' folder
const testdataDir = path.resolve(srcDir, 'testdata');
const csvFilePath = `${testdataDir}`;

 export  const convertCsvFileToJsonFile = (csvFileName, jsonFileName, delimiter = ',') => {
    try {
      // Read the CSV file
      const csvData = fs.readFileSync(`${csvFilePath}\\${csvFileName}`, 'utf8');
  
      // Convert CSV to JSON
      const jsonData = CSVToJSON(csvData, delimiter);
  
      // Write JSON data to a new file
      fs.writeFileSync(`${testdataDir}\\${jsonFileName}`, JSON.stringify(jsonData, null, 2));
  
      console.log(`Conversion completed. JSON data written to: ${testdataDir}\\${jsonFileName}`);
    } catch (error) {
      console.error('Error converting CSV to JSON:', error.message);
    }
  };



  
  export function convertCSVToJson(csv: string) {
    // example: const csv = 'firstName,lastName\nJohn,Doe\nJane,Smith'
    const arrayOfLines: string[] = csv.split('\n');
    //output: [['Name, Age, Country'],['John, 30, USA],['Alice, 25, Canada'],['Bob, 35, UK']];
    const linesArray: string[][] = arrayOfLines.map(line => line.split(','));
    //output: [['Name', 'Age', 'Country'],['John', '30', 'USA'],['Alice', '25', 'Canada'],['Bob', '35', 'UK']];

    const headersArray: string[] = linesArray[0];
    // output: ['Name, Age, Country']
    const linesArrayWithoutHeaders: string[][] = linesArray.slice(1);
    //initialize new empry array of objects
    const arrayOfJsonObjects: { [key: string]: string }[] = [];
  
    linesArrayWithoutHeaders.forEach(line => {
        //initialize empty object
        const obj: { [key: string]: string } = {};
        headersArray.forEach((header, index) => {
            obj[header.trim()] = line[index]?.trim() || ''; // Use optional chaining and nullish coalescing
        });
        arrayOfJsonObjects.push(obj);
    });

    return arrayOfJsonObjects;
}