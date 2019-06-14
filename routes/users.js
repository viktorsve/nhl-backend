const dotify = require('node-dotify');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

get = (req, res, next) => {
  var query;
  if (req.query.name) {
    query = req.models.Account.findOne({
      "account.name": req.query.name
    })
  } else {
    query = req.models.Account.find()
  }

  query.exec().then((account) => {
    return res.send(account);
  }).catch((error) => next(error))
}

post = (req, res, next) => {
  req.models.Account.create({
    account: {
      name: req.body.account.name,
    }
  }).then((account) => {
    return res.status(201).send(account);
  }).catch((error) => {
    next(error);
  })
}

getById = (req, res, next) => {
  req.models.Account.findById(req.params.id).then((account) => {
    return res.send(account);
  }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Account.findByIdAndDelete(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

patch = (req, res, next) => {
  req.models.Account.findByIdAndUpdate(req.params.id, {
    $set: dotify(req.body)
  }, {
    returnNewDocument: true,
  }).then((account) => {
    console.log(account)
    res.send(account)
  }).catch((error) => next(error))
}

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
            expiresIn: 31556926 // 1 year in seconds
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



module.exports = {
  get,
  post,
  getById,
  deleteById,
  patch,
  register,
  login
}
