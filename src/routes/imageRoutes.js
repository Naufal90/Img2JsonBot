// src/routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { generateStructureFromImage } = require('../services/imageService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Endpoint untuk meng-handle upload gambar dan menghasilkan JSON
router.post('/generate', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            console.log('❌ Tidak ada file gambar yang diunggah');
            return res.status(400).send('Tidak ada file gambar yang diunggah.');
        }

        const mimeType = req.file.mimetype;
        if (!mimeType.startsWith('image/')) {
            console.log(`❌ File yang diunggah bukan gambar: ${mimeType}`);
            return res.status(400).send('File yang diunggah bukan gambar.');
        }

        console.log(`✅ File gambar diterima: ${req.file.originalname}`);
        const imagePath = req.file.path;
        const outputPath = `output/${req.file.filename}.json`;

        await generateStructureFromImage(imagePath, outputPath);

        res.download(outputPath, `${req.file.filename}.json`, (err) => {
            if (err) {
                console.error('❌ Error saat mengunduh file:', err.message);
            } else {
                console.log(`✅ File berhasil diunduh: ${req.file.filename}.json`);
            }

            fs.unlinkSync(imagePath);
            fs.unlinkSync(outputPath);
            console.log('🗑️ File sementara berhasil dihapus.');
        });
    } catch (err) {
        console.error('❌ Terjadi kesalahan saat memproses file:', err.message);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

module.exports = router;
