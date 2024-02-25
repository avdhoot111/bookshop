import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop",
    port: 3306,
    dateStrings: 'date'
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, data) => {
        if(err) {
            return res.json({Error: err})
        }
        return res.json({data: data});
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO books (publisher, name, price) VALUES (?)";
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.price
    ];
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json({Error: err})
        }
        return res.json({data: data, statusMessage: 'success'});
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE books SET publisher = ?, name = ?, price = ? where id = ?";

    const values = [
        req.body.publisher,
        req.body.name,
        req.body.price
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) {
            return res.json({Error: err})
        }
        return res.json({data: data});
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM books where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({Error: err})
        }
        return res.json({data: data});
    })
})

app.get('/getRecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({Error: err})
        }
        return res.json({data: data});
    })
})

app.listen(5002, () => {
    console.log('backend running');
})
