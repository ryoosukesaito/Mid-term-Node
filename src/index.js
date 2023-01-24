require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  const userName = process.env.USER_NAME || 'World';
  res.send(`<h1>Hello ${userName}!</h1>`)
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});