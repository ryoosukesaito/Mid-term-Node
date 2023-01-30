require("dotenv").config();
const pool = require("../utils/mysql2");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

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
          user: undefined,
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
          user: undefined,
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
              user: undefined,
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  //authenticate username and password
  try {
    const { username, password } = req.body;
    // console.log("here is username"+username);
    // console.log("here is password"+password);
    pool.query(
      "SELECT * FROM Users WHERE username=?",
      [username],
      async (error, result) => {
        // console.log("here is username check" + JSON.stringify(result));
        if (result.length <= 0) {
          return res.status(402).render("login", {
            Title: "Login Page",
            status: "error",
            msg: "Username or Password does not match",
            user: undefined,
          });
        } else {
          // console.log("here is username check:  " + JSON.stringify(result[0].password));
          if (password !== result[0].password) {
            return res.status(402).render("login", {
              Title: "Login Page",
              status: "error",
              msg: "Password does not match",
              user: undefined,
            });
          } else {
            const id = result[0].UserID;
            const token = jwt.sign({ UserID: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log("The token is " + token);
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                //day * hour * min * 1sec
              ),
              httpOnly: true,
            };
            res.cookie("hoge", token, cookieOptions);
            res.status(200).redirect("/home");
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.loggedIn = async (req, res, next) => {
  // req.name = "Checking login";
  // console.log(req.cookies);
  if (req.cookies.hoge) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.hoge,
        process.env.JWT_SECRET
      );
      // console.log(decode);
      pool.query(
        "SELECT * FROM Users WHERE UserID = ?",
        [decode.UserID],
        (err, results) => {
          // console.log(results);
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (err) {
      console.log(err);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("hoge", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.redirect("/");
};

exports.settings = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password, address, about } = req.body;
    if (req.cookies.hoge) {
    const jwtCookies = await promisify(jwt.verify)(
      req.cookies.hoge,
      process.env.JWT_SECRET
    );
    const id = jwtCookies.UserID;

    pool.query(
      "UPDATE Users SET username = ?, email = ?,password= ?, address=?,about=? WHERE UserID =?",
      [username,email, password, address, about, id]
      )
      res.redirect("/profile");
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteProfile =  (req, res, next) => {
  // res.send("deleteProfile Function");
  const id = req.params.id;
  pool.query("DELETE FROM Users WHERE UserID = ?",[id])
  res.redirect("/")
  // res.send("<h1> delete User successfully </h1>");
};
