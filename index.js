require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const cors = require('cors');
const authRoute = require('./src/route/auth.route');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(bodyParser.json());
app.use(xss());

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

app.use(authRoute);

app.use((req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`service running on PORT ${PORT}`);
});
