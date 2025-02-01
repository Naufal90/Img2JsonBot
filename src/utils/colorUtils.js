// src/utils/colorUtils.js
const Jimp = require('jimp');
const { COLOR_TO_BLOCK } = require('../config/constants');

// Fungsi untuk menghitung perbedaan warna
function colorDifference(color1, color2) {
    const c1 = Jimp.intToRGBA(Jimp.cssColorToHex(color1));
    const c2 = Jimp.intToRGBA(Jimp.cssColorToHex(color2));
    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
}

// Fungsi untuk mendapatkan warna terdekat
function getClosestBlock(colorHex) {
    if (!colorHex) {
        console.error('❌ Warna kosong diterima di getClosestBlock');
        return null;
    }

    const colors = Object.keys(COLOR_TO_BLOCK);
    let closest = colors[0];
    let minDiff = Infinity;

    colors.forEach(refColor => {
        const diff = colorDifference(colorHex, refColor);
        if (diff < minDiff) {
            closest = refColor;
            minDiff = diff;
        }
    });

    console.log(`🎯 Warna ${colorHex} paling dekat dengan ${closest}`);
    return COLOR_TO_BLOCK[closest];
}

module.exports = {
    colorDifference,
    getClosestBlock,
};
