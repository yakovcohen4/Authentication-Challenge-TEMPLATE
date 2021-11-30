//
const USERS = [
  {
    email: 'admin@email.com',
    name: 'admin',
    password: 'Rc123456!',
    isAdmin: true,
  },
  {
    email: 'yakov@gmail.com',
    name: 'yakov',
    password: '123',
    isAdmin: false,
  },
  {
    email: 'ori@gmail.com',
    name: 'ori',
    password: '123456',
    isAdmin: false,
  },
];
const INFORMATION = [{ email: 'yakov2@gmail.com', info: 'yakov info' }]; // {email: ${email}, info: "${name} info"}
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
  const user = req.body;
  // console.log(user);
  const body = {};
  let flag = 0;
  for (let user1 of USERS) {
    if (user.email === user1.email && user.password === user1.password) {
      console.log('yes');
      body.email = user1.email;
      body.name = user1.name;
      body.isAdmin = user1.isAdmin;
      const accessToken = jwt.sign(user, ACCESS_TOKEN, {
        expiresIn: '60s',
      });
      body.accessToken = accessToken;
      const refreshToken = jwt.sign(user, REFRESH_TOKENS);
      body.refreshToken = refreshToken;
      REFRESHTOKENS.push(refreshToken);
      return res.status(200).send(body);
    } else if (user.email === user1.email || user.password === user1.password) {
      flag = 1;
    }
  }
  if (flag === 0) {
    return res.status(404).send('cannot find user');
  } else if (flag === 1) {
    return res.status(403).send('User or Password incorrect');
  }
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
  const refreshToken = req.body.token;
  if (refreshToken === null) {
    return res.status(401)('Refresh Token Required');
  }
  if (!REFRESHTOKENS.includes(refreshToken)) {
    return res.status(403)('Invalid Refresh Token');
  }
  jwt.verify(refreshToken, REFRESH_TOKENS, (err, user) => {
    if (err) return res.status(403)('Invalid Refresh Token');
    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN, {
      expiresIn: '5s',
    });
    return res.status(200).send({ accessToken: accessToken });
    next();
  });
};

exports.logout = (req, res, next) => {
  res.send('logout');
  //   res.send('cannot find user');
};
