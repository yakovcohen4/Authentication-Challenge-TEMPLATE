/* write the code to run app.js here */
// require('dotenv').config();
const app = require('./app');

const env = process.env.NODE_ENV || 'production';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
