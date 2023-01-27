const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { Title: "Login Page" });
});
router.get("/register", (req, res) => {
  res.render("register", {
    Title: "Register Page",
    status: "",
    msg: false,
  });
});

// router.get("/", (req, res) => {});

module.exports = router;
