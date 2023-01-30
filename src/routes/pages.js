const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get(["/", "/login"], (req, res) => {
  res.render("login", {
    Title: "Login Page",
    status: "",
    msg: false,
    user: undefined,
    name1: undefined,
  });
});
router.get("/register", (req, res) => {
  res.render("register", {
    Title: "Register Page",
    status: "",
    msg: false,
    user: undefined,
    name1: undefined,
  });
});

router.get("/home", registerController.loggedIn, (req, res) => {
  // console.log("Checking name on router: " + req.name);
  if (req.user) {
    // console.log(req.user)
    //later on add to avatar's icon
const name1 = req.user.username.slice(0, 1);
    res.render("home", {
      Title: "Home Page",
      user: req.user,
      username: req.user.username,
      msg: "You are logged in successfully",
      name1: name1,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/profile", registerController.loggedIn, (req, res) => {
  if (req.user) {
    const name1 = req.user.username.slice(0, 1);
    res.render("profile", {
      user: req.user, Title: "Profile Page",  name1: name1,});
  } else {
    res.redirect("/login");
  }
});

router.get("/settings",registerController.loggedIn, (req, res) => {
  if (req.user) {
    const name1 = req.user.username.slice(0, 1);
    res.render("settings", { user: req.user, Title: "Settings Page",name1: name1 })
  } else {
    res.redirect("/login");
  }
});



module.exports = router;
