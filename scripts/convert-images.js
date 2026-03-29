const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/images');
const outputDir = inputDir; // Convert in-place (add new extension)

/**
 * Recurse through directory and convert images
 */
async function processDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.tiff'].includes(ext)) {
                const outputFilename = entry.name.replace(ext, '.webp');
                const outputPath = path.join(directory, outputFilename);

                // Don't re-convert if webp exists and is newer
                if (fs.existsSync(outputPath)) {
                    const originalStat = fs.statSync(fullPath);
                    const webpStat = fs.statSync(outputPath);
                    if (webpStat.mtime > originalStat.mtime) {
                        console.log(`Skipping ${entry.name} (WebP up to date)`);
                        continue;
                    }
                }

                try {
                    await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(outputPath);
                    console.log(`Converted: ${entry.name} -> ${outputFilename}`);
                } catch (error) {
                    console.error(`Error converting ${entry.name}:`, error);
                }
            }
        }
    }
}

console.log('--- Starting WebP Conversion ---');
processDirectory(inputDir)
    .then(() => console.log('--- WebP Conversion Finished ---'))
    .catch(err => console.error('--- WebP Conversion Failed ---', err));
