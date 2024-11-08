const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'algo_genesis_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL");
});

// Créer un nouvel élément
app.post('/api/data', (req, res) => {
    const { name, value } = req.body;
    const sql = "INSERT INTO data (name, value) VALUES (?, ?)";
    db.query(sql, [name, value], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...req.body });
    });
});

// Lire les données
app.get('/api/data', (req, res) => {
    db.query("SELECT * FROM data", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Mettre à jour un élément
app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    const sql = "UPDATE data SET name = ?, value = ? WHERE id = ?";
    db.query(sql, [name, value, id], (err, result) => {
        if (err) throw err;
        res.send("Mise à jour réussie");
    });
});

// Supprimer un élément
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM data WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send("Suppression réussie");
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`API en cours d'exécution sur le port ${PORT}`));
