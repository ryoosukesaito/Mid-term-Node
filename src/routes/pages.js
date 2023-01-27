const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get(["/","/login"], (req, res) => {
  res.render("login", {
    Title: "Login Page",
    status: "",
    msg: false,
  });
});
router.get("/register", (req, res) => {
  res.render("register", {
    Title: "Register Page",
    status: "",
    msg: false,
  });
});

router.get("/home", registerController.loggedIn, (req, res) => {
  // console.log("Checking name on router: " + req.name);
  if (req.user) {
    console.log(req.user)
    res.render("home",{
      Title: "Home Page",
      username: req.user.username
    })
  } else {
    res.redirect('/login')
    
  }

});

module.exports = router;
