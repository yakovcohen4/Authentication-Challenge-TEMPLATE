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
]; // [...{email, name, password, isAdmin}...]
const INFORMATION = []; // [...{email, info}...]
const REFRESHTOKENS = [];

exports.register = (req, res, next) => {
  const user = req.body;
  for (let user1 of USERS) {
    if (user.email === user1.email) {
      res.send('user already exists');
      return;
    }
  }
  USERS.push(user);
  res.send('Register Success');
};

exports.login = (req, res, next) => {
  res.send('accessToken, refreshToken , email, name, isAdmin');
  //   res.send('cannot find user');
};
