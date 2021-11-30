const express = require('express');
const { information, users } = require('../controllers/apiController');

const apiRoute = express.Router();

apiRoute.get('/', (req, res) => {
  res.send('in');
});

apiRoute.get('/v1/information', information);
apiRoute.get('/v1/users', users);

module.exports = apiRoute;
