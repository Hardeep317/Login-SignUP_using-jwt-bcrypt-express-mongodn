const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./connect/connect')
const cors = require('cors');
const { register, login } = require('./userControllers/authController');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send("Welcome to MERN stack")
})

app.post('/register', register);
app.post('/login', login);


connect()
.then(() => {
    app.listen(5000, () => {
        console.log("Connected in index file also")
    })
})