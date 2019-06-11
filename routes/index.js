const express = require('express');
const account = require('./account.js');
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

module.exports = router;
