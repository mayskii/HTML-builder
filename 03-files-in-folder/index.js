const fs = require('fs').promises;
const path = require('path');

async function displayFileInfo() {
    const folderPath = path.join(__dirname, 'secret-folder');

    try {
        const files = await fs.readdir(folderPath, { withFileTypes: true});

        for (const file of files) {
            const fullPath = path.join(folderPath, file.name);

            if (file.isFile()) {

                const fileInfo = await fs.stat(fullPath);

                const fileExtension = path.extname(file.name).slice(1);

                const fileSize = (fileInfo.size / 1024).toFixed(3);

                const fileName = path.basename(file.name, path.extname(file.name));

                console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
            }
        }
    } catch (error) {
        console.error('Error reading the folder', error.message);
    }
}

displayFileInfo();