const pool = require("../utils/mysql2");


const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!email || !password)
    return res.json({ status: "error", error: "Plz enter email and password" });
  else {
    // console.log(username);
    pool.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) throw err;
        if (results.length>0)
          return res.json({
            status: "error",
            error: "This username already exists",
          });
        else {
            ("INSERT INTO Users SET ?",
            {
              username: username,
              email: email,
              password: password,
            },
            (error, results) => {
              if (error) throw error;
              return res.json({
                status: "success",
                success: "User has been registered",
              });
            }
          );
        }
      }
    );
  }
};

// module.exports = registerController;