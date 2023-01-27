const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
// const login = require('../controllers/loginFunc');

//user registration
router.post("/register", registerController.register);
router.post("/login", registerController.register);

module.exports = router;
