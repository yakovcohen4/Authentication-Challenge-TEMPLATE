//
const USERS = [
  {
    email: 'yakov@gmail.com',
    name: 'yakov',
    password: '123',
    isAdmin: true,
  },
  {
    email: 'ori@gmail.com',
    name: 'ori',
    password: '123456',
    isAdmin: false,
  },
];
const INFORMATION = []; // {email: ${email}, info: "${name} info"}
const REFRESHTOKENS = [];
//

exports.information = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(401).send('Access Token Required');
  }

  jwt.verify(token, ACCESS_TOKEN, (err, user) => {
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
    res.status(200).send(body);
    next();
  });
};

exports.users = (req, res, next) => {
  res.send('users');
  //   res.send('cannot find user');
};
