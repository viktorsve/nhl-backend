const dotify = require('node-dotify');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

register = (req, res, next) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    username: req.body.username
  }).then(user => {
    if (user) {
      return res.status(400).json({
        username: "Username already exists"
      })
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  });
}

login = (req, res, next) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        usernamenotfound: "Username not found"
      });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          user: user.username
        };

        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: "Password incorrect"
          });
      }
    });
  });
}

getlikes = (req, res, next) => {
  User.findOne({ username: req.params.username }).then(user => {
    return res.send(user);
  })
}

addlikes = (req, res, next) => {
  let player = {"playerId": req.body.playerId, "name": req.body.name}
  User.updateOne({ username: req.params.username }, {$push: {likedPlayers: player}}).then(user => {
    return res.send(user);
  })
}

removelikes = (req, res, next) => {
  let player = {"playerId": req.body.playerId}
  User.updateOne({ username: req.params.username }, {$pull: {likedPlayers: player}}).then(user => {
    return res.send(user);
  })
}

module.exports = {
  register,
  login,
  getlikes,
  addlikes,
  removelikes
}
