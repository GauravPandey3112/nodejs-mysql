const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/Users.routes')
const db = require('./connection')



app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))


// Retrieve all users
app.use('/users', userRoutes);


app.listen(3000, () => {
    console.log('app is runnning on port 3000');
})

