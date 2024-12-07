const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');
const connection = require('./db/connection'); // Impor koneksi database

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use('/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
