require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const pool = require('../database/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    const location = path.join(__dirname, '..', 'build', 'index.html')
    res.sendFile(location);
});

const adminRoute = require('./routes/adminRoutes/adminRoutes'); 
const userRoute = require('./routes/userRoutes/userRoutes'); 
app.use('/', userRoute); 
app.use('/admin', adminRoute); 

app.get('/error.css', (req, res) => {

    const location = path.join(__dirname, '.', 'error.css')
    res.sendFile(location);
});

app.get('*', (req, res) => {

    const location = path.join(__dirname, '.', 'error404.html')
    res.sendFile(location);
});


server.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`);
});

exports.app = app
exports.pool = pool
exports.cors = cors

