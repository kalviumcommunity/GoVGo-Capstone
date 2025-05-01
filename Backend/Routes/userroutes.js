const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { signup, signin } = require('../Controllers/authcontrollers');
const { user } = require('../Controllers/userController');

dotenv.config();

router.post("/register", signup)
router.post("/login",signin)
router.get("/findUser",user)

module.exports = router;
