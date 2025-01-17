const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
    const styleDir = path.join(__dirname, 'styles');
    const outputDir  = path.join(__dirname, 'project-dist');
    const outputFile  = path.join(outputDir, 'bundle.css');

    try {
        await fs.mkdir(outputDir, { recursive: true });

        const files = await fs.readdir(styleDir);

        let cssContent = '';

        for (const file of files) {
            const filePath = path.join(styleDir, file);
            const ext = path.extname(file);

            if (ext === '.css') {

                const stats = await fs.stat(filePath);
                if (stats.isFile()){
                    const fileContent = await fs.readFile(filePath, 'utf-8');
                    cssContent += fileContent + '\n';
                }
            }
        }

        await fs.writeFile(outputFile, cssContent, 'utf-8');

        console.log('bundle.css successfully created!');
    } catch (error) {
        console.log('Error merging styles:', error)
    }
}

mergeStyles();



