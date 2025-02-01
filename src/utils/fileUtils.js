// src/utils/fileUtils.js
const fs = require('fs');

function ensureOutputFolderExists() {
    if (!fs.existsSync('output')) {
        fs.mkdirSync('output');
        console.log('📂 Folder "output" dibuat.');
    }
}

module.exports = {
    ensureOutputFolderExists,
};
