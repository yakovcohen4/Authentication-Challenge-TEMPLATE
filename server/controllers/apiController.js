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
  res.send('information');
  //   res.send('cannot find user');
};

exports.users = (req, res, next) => {
  res.send('users');
  //   res.send('cannot find user');
};
