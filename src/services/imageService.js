// src/services/imageService.js
const Jimp = require('jimp');
const jsonfile = require('jsonfile');
const { getClosestBlock } = require('../utils/colorUtils');
const { ensureOutputFolderExists } = require('../utils/fileUtils');

// Fungsi untuk mengonversi gambar ke struktur JSON
async function generateStructureFromImage(imagePath, outputPath) {
    try {
        console.log(`📥 Memulai proses konversi untuk file: ${imagePath}`);

        // Baca gambar
        const image = await Jimp.read(imagePath);
        console.log('✅ Gambar berhasil dibaca.');

        const blocks = [];
        const origin = { x: 0, y: 0, z: 0 };

        // Scan setiap pixel gambar
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const r = image.bitmap.data[idx];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            const hexColor = Jimp.rgbaToInt(r, g, b, 255).toString(16).padStart(6, '0');
            const colorHex = `#${hexColor}`;
            
            console.log(`🎨 Memproses pixel (${x}, ${y}): ${colorHex}`);

            const blockType = getClosestBlock(colorHex);
            if (blockType) {
                blocks.push({ x, y: -y, z: 0, type: blockType });
            }
        });

        console.log(`✅ Proses scan selesai. Total blok: ${blocks.length}`);

        // Simpan struktur ke file JSON
        ensureOutputFolderExists();
        const structure = { origin, blocks };
        jsonfile.writeFileSync(outputPath, structure, { spaces: 2 });
        console.log(`✅ Struktur berhasil disimpan ke: ${outputPath}`);
    } catch (err) {
        console.error('❌ Terjadi kesalahan dalam generateStructureFromImage:', err.message);
        throw err;
    }
}

module.exports = {
    generateStructureFromImage,
};
