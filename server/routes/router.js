const express = require('express');
const {
  register,
  login,
  tokenValidate,
  token,
  logout,
} = require('../controllers/routerController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('in');
});

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/tokenValidate', tokenValidate);
router.post('/users/token', token);
router.post('/users/logout', logout);

module.exports = router;
