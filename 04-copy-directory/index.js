const fs = require('fs').promises;
const path = require('path');


async function copyDir () {
    const sourseDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files-copy');

    try {
        await fs.mkdir(destDir, {recursive: true});

        const files = await fs.readdir(sourseDir);
        const destFiles = await fs.readdir(destDir);

        for (const file of files) {
            const sourceFilePath = path.join(sourseDir, file);
            const destFilePath = path.join(destDir, file);

            const stats = await fs.stat(sourceFilePath);

            if (stats.isFile()) {
                await fs.copyFile(sourceFilePath, destFilePath);
            }
        }

        for (const file of destFiles) {
            const sourceFilePath = path.join(sourseDir, file);
            const destFilePath = path.join(destDir, file);

            try {
                await fs.stat(sourceFilePath);
            } catch (error) {
                await fs.unlink(destFilePath);
                console.log (`File deleted: ${file}`);
            }
        }

        console.log ('Coping complite!');
    } catch(error) {
        console.log ('Error copying:', error);
    }
}

copyDir();