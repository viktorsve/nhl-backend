const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateLoginInput = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Passwords fiield is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
