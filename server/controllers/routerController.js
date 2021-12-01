const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// IMPORT TOKENS AND DATA
let { ACCESS_TOKEN_SECRET, REFRESH_ACCESS_TOKEN_SECRET } = require('./env');
let { USERS, INFORMATION, REFRESHTOKENS } = require('../helpers/data');

exports.register = async (req, res, next) => {
  const user = req.body;
  let isAdmin = false;
  if (user.password === 'Rc123456!') {
    isAdmin = true;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  for (let user1 of USERS) {
    if (user.email === user1.email) {
      res.status(409).send('user already exists');
      return;
    }
  }
  USERS.push(user);
  INFORMATION.push({ email: user.email, info: `${user.name} info` });
  console.log(INFORMATION);
  res.status(201).send('Register Success');
  next();
};

exports.login = async (req, res, next) => {
  const user = req.body;
  const body = {};
  let flag = 0;

  for (let user1 of USERS) {
    let ans = await bcrypt.compare(user.password, user1.password);

    if (user.email === user1.email && ans) {
      user.isAdmin = user1.isAdmin;
      body.email = user1.email;
      body.name = user1.name;
      body.isAdmin = user1.isAdmin;
      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: '10s',
      });
      body.accessToken = accessToken;
      const refreshToken = jwt.sign(user, REFRESH_ACCESS_TOKEN_SECRET);
      body.refreshToken = refreshToken;
      REFRESHTOKENS.push(refreshToken);
      return res.status(200).send(body);
    } else if (user.email === user1.email || ans) {
      flag = 1;
    }
  }
  if (flag === 0) {
    return res.status(404).send('cannot find user');
  } else if (flag === 1) {
    return res.status(403).send('User or Password incorrect');
  }
  next();
};

exports.tokenValidate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(401).send('Access Token Required');
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Access Token');
    }
    return res.status(200).send({ body: { valid: true } });
  });
  next();
};

exports.token = (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).send('Refresh Token Required');
  }
  if (!REFRESHTOKENS.includes(refreshToken)) {
    return res.status(403).send('Invalid Refresh Token');
  }
  jwt.verify(refreshToken, REFRESH_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403)('Invalid Refresh Token');
    console.log(user);
    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: '10s',
    });
    res.status(200).send({ accessToken: accessToken });
    next();
  });
};

exports.logout = (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(400).send('Refresh Token Required');
  }
  if (!REFRESHTOKENS.includes(refreshToken)) {
    return res.status(400).send('Invalid Refresh Token');
  }
  REFRESHTOKENS = REFRESHTOKENS.filter(token => {
    token !== refreshToken;
  });
  res.status(200).send('User Logged Out Successfully');
  next();
};
