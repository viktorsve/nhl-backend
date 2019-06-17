const express = require('express');
const account = require('./users.js');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", account.register)
router.post('/login', account.login)
router.get('/login/:username', account.getlikes)
router.post('/login/:username', account.addlikes)
router.delete('/login/:username', account.removelikes)

module.exports = router;
