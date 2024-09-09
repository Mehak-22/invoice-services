const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');

exports.parseFile = (file) => {
    const filePath = file.path;
    if (file.mimetype === 'text/csv') {
        return parseCSV(filePath);
    } else {
        return parseExcel(filePath);
    }
};

// Function to parse CSV files
const parseCSV = (filePath) => {
    let results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

// Function to parse Excel files
const parseExcel = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};
