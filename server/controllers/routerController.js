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

exports.register = (req, res, next) => {
  const user = req.body;
  for (let user1 of USERS) {
    if (user.email === user1.email) {
      res.status(409).send('user already exists');
      return;
    }
  }
  USERS.push(user);
  INFORMATION.push({ email: user.email, info: `${user.name} info` });
  res.status(200).send('Register Success');
};

exports.login = (req, res, next) => {
  res.send('accessToken, refreshToken , email, name, isAdmin');
  //   res.send('cannot find user');
};

exports.tokenValidate = (req, res, next) => {
  res.send('tokenValidate');
  //   res.send('cannot find user');
};

exports.information = (req, res, next) => {
  res.send('information');
  //   res.send('cannot find user');
};

exports.token = (req, res, next) => {
  res.send('token');
  //   res.send('cannot find user');
};

exports.logout = (req, res, next) => {
  res.send('logout');
  //   res.send('cannot find user');
};
