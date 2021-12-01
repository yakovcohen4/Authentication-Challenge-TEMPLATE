exports.USERS = [
  {
    email: 'admin@email.com',
    name: 'admin',
    password: '$2b$10$DHvaY7RMYSkqOpJWdQ6qn.k5NNkdcja8p0OcRP0rLzObYhsonacvG',
    isAdmin: true,
  },
  {
    email: 'yakov@gmail.com',
    name: 'yakov',
    password: '$2b$10$Eu7iKa0qbJDkkUE8KAC8VeKxelhItsS1UKGY9WkxRtlNPR0I7UyQe',
    isAdmin: false,
  },
  {
    email: 'ori@gmail.com',
    name: 'ori',
    password: '$2b$10$gMzBENcPw2MUWmRsnbG5X.BHweiY8dktdms4jAOrshGX/xIEBhEAa',
    isAdmin: false,
  },
];

exports.INFORMATION = [{ email: 'admin@email.com', name: 'admin info' }];

exports.REFRESHTOKENS = [];

exports.serverApis = [
  {
    method: 'post',
    path: '/users/register',
    description: 'Register, Required: email, name, password',
    example: {
      body: { email: 'user@email.com', name: 'user', password: 'password' },
    },
  },
  {
    method: 'post',
    path: '/users/login',
    description: 'Login, Required: valid email and password',
    example: { body: { email: 'user@email.com', password: 'password' } },
  },
  {
    method: 'post',
    path: '/users/token',
    description: 'Renew access token, Required: valid refresh token',
    example: { headers: { token: 'Refresh Token' } },
  },
  {
    method: 'post',
    path: '/users/tokenValidate',
    description: 'Access Token Validation, Required: valid access token',
    example: { headers: { Authorization: 'Bearer Access Token' } },
  },
  {
    method: 'get',
    path: '/api/v1/information',
    description: "Access user's information, Required: valid access token",
    example: { headers: { Authorization: 'Bearer Access Token' } },
  },
  {
    method: 'post',
    path: '/users/logout',
    description: 'Logout, Required: access token',
    example: { body: { token: 'Refresh Token' } },
  },
  {
    method: 'get',
    path: 'api/v1/users',
    description: 'Get users DB, Required: Valid access token of admin user',
    example: { headers: { authorization: 'Bearer Access Token' } },
  },
];
