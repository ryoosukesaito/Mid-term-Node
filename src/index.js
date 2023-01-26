require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const dbPool = require("./utils/mysql2");

app.use("/js", express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dbPool.connect((err) => {
  if (err) throw err;
  console.log("database connected"); //
})

app.use("/", require("./routes/pages"));
app.use("/api", require("./routes/Users"));
// app.use("/register", require("./routes/pages"));

//connect to port and database
const PORT = process.env.PORT || 6000;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  // const [data] = await dbPool.query("SELECT 5");
  // console.log("database is connected");
});
