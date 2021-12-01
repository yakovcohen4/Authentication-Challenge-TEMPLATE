const express = require('express');
const { option } = require('../controllers/optionsController');

const option = express.Router();

option.options('/', option);

module.exports = option;
