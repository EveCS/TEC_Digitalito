const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const apiController = require('./apiController');

app.get('/', apiController.getIndex);
app.post('/chat', apiController.postChat);
app.get('/chat', apiController.getChat);
app.post('/message', apiController.postMessage);

app.listen(3003, () => {
    console.log('Server Started on Port 3003');
});

module.exports = app;