const express = require('express');
const router = express.Router();
const register = require('../controllers/registerFunc')
// const login = require('../controllers/loginFunc');


//user registration 
router.post("/register", register);
// router.post("/login", login);


// router.get('')

module.exports = router;