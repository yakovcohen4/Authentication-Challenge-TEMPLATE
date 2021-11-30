/* write your server code here */

const express = require('express');
const app = express();
const morgan = require('morgan');

const router = require('./routes/router');
const apiRoute = require('./routes/apiRoute');

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/api', apiRoute);

module.exports = app;
