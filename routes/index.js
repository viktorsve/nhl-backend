const express = require('express');
const account = require('./users.js');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/accounts', account.get);
router.post('/accounts', account.post);
router.get("/accounts/:id", account.getById)
router.delete("/accounts/:id", account.deleteById)
router.patch("/accounts/:id", account.patch)
router.post("/register", account.register)
router.post('/login', account.login)

module.exports = router;
