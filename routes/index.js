const express = require('express');
const account = require('./account.js');
const counter = require('./counter.js')
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to nhl-backend',
    });
  });
router.get('/accounts', account.get);
router.post('/accounts', account.post);
router.get("/accounts/:id", account.getById)
router.delete("/accounts/:id", account.deleteById)
router.patch("/accounts/:id", account.patch)

router.get('/counter', counter.get)
router.put('/counter/:id', counter.put)
router.get('/counter/:id', counter.getById)

module.exports = router;
