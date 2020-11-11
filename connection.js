const mysql = require('mysql');

// Connect DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'demo'
})

db.connect((err) => {
    if (err) throw err;
    return console.log('Connected');
});

module.exports = db;