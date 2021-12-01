const jwt = require('jsonwebtoken');

// IMPORT TOKENS AND DATA
let { ACCESS_TOKEN_SECRET, REFRESH_ACCESS_TOKEN_SECRET } = require('./env');
let { serverApis } = require('../helpers/data');

exports.optionRouter = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res
      .header({ Allow: 'OPTIONS, GET, POST' })
      .send([serverApis[0], serverApis[1]]);
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .header({ Allow: 'OPTIONS, GET, POST' })
        .send([serverApis[0], serverApis[1], serverApis[2]]);
    }
    if (user.isAdmin) {
      return res.header({ Allow: 'OPTIONS, GET, POST' }).send(serverApis);
    }
    return res
      .header({ Allow: 'OPTIONS, GET, POST' })
      .send([
        serverApis[0],
        serverApis[1],
        serverApis[2],
        serverApis[3],
        serverApis[4],
        serverApis[5],
      ]);
  });
};
