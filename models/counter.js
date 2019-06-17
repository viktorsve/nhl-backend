const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  id: Number,
  count: Number,
})

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
