const fs = require('fs').promises;
const path = require('path');

async function buildHTML() {

    const templatePath = path.join(__dirname, 'template.html');
    const componentsDir = path.join(__dirname, 'components');
    const outputDir = path.join(__dirname, 'project-dist');
    const outputHTML = path.join(outputDir, 'index.html');

    const templateContent = await fs.readFile(templatePath, 'utf-8');
    let resultHTML = templateContent;

    const matches = templateContent.match(/{{\w+}}/g);

    if (matches) {
        for (const match of matches) {
            const componentName = match.slice(2, -2);
            const componentPath = path.join(componentsDir, `${componentName}.html`);
            try {
                const componentContent = await fs.readFile(componentPath, 'utf-8');
                resultHTML = resultHTML.replace(match, componentContent);
            } catch (error) {
                console.log(`Can't find ${componentName}.html`);
            }
        }    
    }

    await fs.writeFile(outputHTML, resultHTML, 'utf-8');
    console.log('index.html created!')
}

async function buildCSS() {
    const styleDir = path.join(__dirname, 'styles');
    const outputDir  = path.join(__dirname, 'project-dist');
    const outputCSS  = path.join(outputDir, 'style.css');

    const files = await fs.readdir(styleDir);
    let cssContent = '';

    for (const file of files) {
        if (path.extname(file) === '.css') {

            const filePath = path.join(styleDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            cssContent += fileContent + '\n';
        }                       
    }

    await fs.writeFile(outputCSS, cssContent, 'utf-8');
    console.log('style.css created!')
}

async function copyAssets() {
    const assetsDir = path.join(__dirname, 'assets');
    const outputAssetsDir = path.join(__dirname, 'project-dist', 'assets');

     async function copyDirectory(src, dest) {
        await fs.mkdir(dest, { recursive: true});

        const files = await fs.readdir(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const stats = await fs.stat(srcPath);

            if (stats.isDirectory()) {
                await copyDirectory(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath)
            }
        }
     }

    await copyDirectory(assetsDir, outputAssetsDir);
    console.log('Assets copied!')   
}

async function buildPage() {
    const projectDistDir = path.join(__dirname, 'project-dist');
    await fs.mkdir(projectDistDir, { recursive: true});

    await buildHTML();
    await buildCSS();
    await copyAssets();

    console.log('All complite!') 
}

buildPage()

