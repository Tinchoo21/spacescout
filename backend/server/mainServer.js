const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const pool = require('../database/database');
//const { authenticator } = require('otplib');

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    const location = path.join(__dirname, '..', 'build', 'index.html')
    res.sendFile(location);
});
app.get('/error.css', (req, res) => {

    const location = path.join(__dirname, '.', 'error.css')
    res.sendFile(location);
});

server.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`);
});

exports.app = app
exports.pool = pool

const userServer = require('./userServer/userServer')