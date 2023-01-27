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
  
  pool.query("SELECT email FROM Users WHERE email = ?", [email], (error, result) =>{
    if(error){
      console.log("here is error");
      console.error(error);
    }

    if(result.length > 0){
      console.log("hello from email" + JSON.stringify(result));
      return res.render("register", { 
        Title: "Register Page",
        error : "Email is already registered"
      })
    }
    
    })
   }


