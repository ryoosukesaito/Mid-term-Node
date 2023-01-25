require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views','src/views');
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res, next) => {
  // const userName = process.env.USER_NAME || 'World';
  // res.send(`<h1>Hello ${userName}!</h1>`)
  res.render('login');
});




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});