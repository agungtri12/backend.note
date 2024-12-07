const connection = require('../db/connection');

// membuat Note
exports.createNote = (req, res) => {
    const { title, datetime, note } = req.body;
    const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    connection.query(sql, [title, datetime, note], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, message: 'Catatan berhasil dibuat' });
    });
};

// menampilkan semua Note
exports.getAllNotes = (req, res) => {
    const sql = 'SELECT * FROM notes';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// menampilkasn salah satu note sesuai id Note
exports.getNote = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notes WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Catatan tidak ditemukan' });
        res.json(results[0]);
    });
};

// memperbarui Note
exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    connection.query(sql, [title, datetime, note, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Catatan berhasil diperbarui' });
    });
};

// menghapus Note
exports.deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Catatan berhasil dihapus' });
    });
};
