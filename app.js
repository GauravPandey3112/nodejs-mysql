const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');
const { query } = require('express');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Connect DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'demo'
})

db.connect();

app.get('/', (req, res) => {
    return res.send({ error: true, message: 'hello' })
})

// Retrieve all users
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM info'
    db.query(sql, (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'complete Data' })
    })
})

// get user with id
app.get('/data/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'please provide id' });
    }
    db.query('SELECT * FROM info where id=?', id, (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results[0], message: 'user by id' })
    })

})

// past new user
app.post('/adduser', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    console.log(email);
    if (!name && !email) {
        return res.status(400).send({ error: true, message: 'not enough info' })
    }

    db.query('INSERT INTO info(name, email) value(?,?)', [name, email], (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'user added' })
    })
})

// update user with id
app.put('/update', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;

    if (!id || !name || !email) {
        return res.status(400).send({ error: true, message: 'please provide full info' })
    }

    db.query('UPDATE info SET name=?, email=? WHERE id=?', [name, email, id], (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'user updated' })
    })
})

app.delete('/deleteuser', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'provide ID please' })
    }
    db.query('DELETE FROM info WHERE id=?', id, (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'user deleted' })
    })
})

app.listen(3000, () => {
    console.log('app is runnning on port 3000');
})

