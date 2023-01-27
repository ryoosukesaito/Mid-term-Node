require("dotenv").config();
const pool = require("../utils/mysql2");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  console.log(req.body);
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;

  // console.log(username);
  // console.log(email);
  // console.log(password);
  const { username, email, password } = req.body;

  //email authentication
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

  //username authentication
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
      //insert account data
      pool.query(
        "INSERT INTO Users SET ?",
        {
          username: username,
          email: email,
          password: password,
        },
        (Error, Result) => {
          if (Error) {
            console.log(Error.message);
          } else {
            console.log(Result);
            return res.render("register", {
              Title: "Register Page",
              status: "success",
              msg: "User has been registered successfully",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log("here is username"+username);
    // console.log("here is password"+password);
    pool.query(
      "SELECT * FROM Users WHERE username=?",
      [username],
      async (error, result) => {
        console.log("here is username check" + JSON.stringify(result));
        if (result.length <= 0) {
          return res.status(402).render("login", {
            Title: "Login Page",
            status: "error",
            msg: "Username or Password does not match",
          });
        } else {
          console.log(
            "here is username check:  " + JSON.stringify(result[0].password)
          );
          if (password !== result[0].password) {
            return res.status(402).render("login", {
              Title: "Login Page",
              status: "error",
              msg: "Password does not match",
            });
          } else {
            const id = result[0].UserID;
            const token = jwt.sign({ UserID: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log("The token is " + token);
            // return res.send("Good");
          }

          //render to home page later
          // return res.status(200).render("login", {
          //   Title: "Login Page",//rewrite page name to wanna render later
          //   status: "success",
          //   msg: `Hello ${username}`
          // })
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
