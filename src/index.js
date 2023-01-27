require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dbPool = require("./utils/mysql2");

app.use("/js", express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", "src/views");

dbPool.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("database connected");
  }
});

const jsonParser = bodyParser.urlencoded({ extended: false });

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", require("./routes/pages"));
app.use("/api", jsonParser, require("./routes/auth"));

//connect to port and database
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
