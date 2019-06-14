mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likedPlayers: [{
    playerId: {
      type: String,
      required: true
    }
  }]
});

module.exports = User = mongoose.model('users', UserSchema);
