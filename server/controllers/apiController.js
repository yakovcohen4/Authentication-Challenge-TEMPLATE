//
const jwt = require('jsonwebtoken');

// IMPORT TOKENS AND DATA
const { ACCESS_TOKEN_SECRET, REFRESH_ACCESS_TOKEN_SECRET } = require('./env');
const { USERS, INFORMATION, REFRESHTOKENS } = require('../helpers/data');

exports.information = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(401).send('Access Token Required');
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Access Token');
    }
    const body = {};
    for (let info of INFORMATION) {
      if (info.email === user.email) {
        body.email = user.email;
        body.info = info.info;
      }
    }
    res.status(200).send([body]);
    next();
  });
};

exports.users = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Token Required');
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Access Token');
    }
    for (let user1 of USERS) {
      if (user1.email === user.email) {
        if (user1.isAdmin) {
          return res.status(200).send(USERS);
        }
      }
    }
    return res.status(403).send('Invalid Access Token');
  });
  next();
};
