const express = require('express');
const account = require('./account.js');
const counter = require('./counter.js')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", account.register)
router.post('/login', account.login)
router.get('/login/:username', account.getlikes)
router.post('/login/:username', account.addlikes)
router.delete('/login/:username', account.removelikes)

router.get('/counter', counter.get)
router.put('/counter/:id', counter.put)
router.get('/counter/:id', counter.getById)

module.exports = router;
