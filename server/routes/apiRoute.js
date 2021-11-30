const express = require('express');
const { register, login } = require('../controllers/authController');

const apiRoute = express.Router();

apiRoute.get('/', (req, res) => {
  res.send('in');
});

apiRoute.post('/users/register', register);
apiRoute.post('/users/login', login);

module.exports = apiRoute;
