require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dbPool = require("./utils/mysql2");

const cookieParser = require('cookie-parser');

const pageRouter = require("./routes/pages");
const apiRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks.router");

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

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", pageRouter);
app.use("/api", apiRouter);
app.use("/tasks", tasksRouter);

//connect to port and database
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
