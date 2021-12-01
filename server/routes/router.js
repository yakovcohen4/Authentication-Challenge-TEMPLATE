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

router.post('/register', register);
router.post('/login', login);
router.post('/tokenValidate', tokenValidate);
router.post('/token', token);
router.post('/logout', logout);

module.exports = router;
