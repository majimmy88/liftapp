const express = require('express');
const path = require('path');
const router = require('./router.js');
const db = require('../database/index.js');


const bodyParser = require('body-parser')

const PORT = 8888

const app = express()

app.use(express.json())

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.static(path.join(__dirname, '/../public')));

app.use(
    '/liftapp/:id',
    express.static(path.join(__dirname, '../public')));

app.get('/api/:id', router.router);
app.post('/api/:id', router.router);

app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});




app.listen(PORT, ()=> console.log(`Lift app listening on port ${PORT}`))