const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', (data) => {
    process.stdout.write(data);
});
readStream.on('error', (error) => {
    console.error('Error reading file:', error.message);
});
