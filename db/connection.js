const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

connection.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke server database:', err.stack);
        return;
    }
    console.log('Berhasil terhubung ke server database.');

    // Periksa apakah database sudah ada
    const databaseName = process.env.DATABASE;
    connection.query(`SHOW DATABASES LIKE '${databaseName}'`, (err, results) => {
        if (err) {
            console.error('Gagal memeriksa database:', err.message);
            return;
        }

        if (results.length === 0) {
            console.warn(`Peringatan: Database "${databaseName}" belum dibuat.`);
            console.log(`Silakan buat database "${databaseName}" terlebih dahulu.`);
        } else {
            console.log(`Database "${databaseName}" ditemukan.`);
            // Pilih database
            connection.changeUser({ database: databaseName }, (err) => {
                if (err) {
                    console.error('Gagal memilih database:', err.message);
                    return;
                }
                console.log(`Berhasil menggunakan database "${databaseName}".`);
            });
        }
    });
});

module.exports = connection;
