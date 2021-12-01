const express = require('express');
const { optionRouter } = require('../controllers/optionsController');

const router = express.Router();

router.options('/', optionRouter);

module.exports = router;
