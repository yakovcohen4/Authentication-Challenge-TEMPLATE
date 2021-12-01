/* write your server code here */

const express = require('express');
const app = express();
const morgan = require('morgan');

const router = require('./routes/router');
const apiRoute = require('./routes/apiRoute');
const option = require('./routes/option');

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/users', router);
app.use('/api', apiRoute);
app.use('/', option);

module.exports = app;
