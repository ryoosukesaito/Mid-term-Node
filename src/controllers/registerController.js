require("dotenv").config();
const pool = require("../utils/mysql2");

exports.register = (req, res) => {
  console.log(req.body);
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;

  // console.log(username);
  // console.log(email);
  // console.log(password);
  const { username, email, password } = req.body;

  pool.query(
    "SELECT email FROM Users WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        console.error(error);
      }

      if (result.length > 0) {
        console.log("hello from email" + JSON.stringify(result));
        return res.render("register", {
          Title: "Register Page",
          status: "error",
          msg: "Email is already registered",
        });
      }
    }
  );

  pool.query(
    "SELECT username FROM Users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log("here is error");
        console.error(err);
      }
      if (results.length > 0) {
        console.log("hello from username" + JSON.stringify(results));
        return res.render("register", {
          Title: "Register Page",
          status: "error",
          msg: "username is already taken",
        });
      }

      pool.query("INSERT INTO Users SET ?", {
        username: username,
        email: email,
        password: password,
      }, (Error, Result) => {
        if(Error) {
          console.log(Error.message);
        }else{
          console.log(Result);
          return res.render("register", {
          Title: "Register Page",
          status: "success",
          msg: "User has been registered successfully",
          }
          )
        }
      });
    }
  );
};

exports.login = (req, res) => {}