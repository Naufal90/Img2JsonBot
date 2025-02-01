// src/app.js
const express = require('express');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const port = process.env.PORT || 9253;

// Middleware untuk menerima data form
app.use(express.static(path.join(__dirname, '../public'))); // Untuk file statis seperti HTML
app.use(express.urlencoded({ extended: true }));

// Gunakan router untuk endpoint API
app.use('/', imageRoutes);

// Mulai server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
