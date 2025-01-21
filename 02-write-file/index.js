const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt')
const writeStream = fs.createWriteStream(filePath, {flags: 'a'});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome! Enter your message please...');

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit'){
        console.log('Goodbye! Have a good day!');
        rl.close();
        process.exit();
    } else {
        writeStream.write(input + '\n')
    }
})

process.on('SIGINT', () => {
    console.log('Goodbye! Have a good day');
    rs.close();
    process.exit();
})