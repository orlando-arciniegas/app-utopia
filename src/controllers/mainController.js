const fs = require('fs');
const items = readDataFile();

function readDataFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeDataFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

