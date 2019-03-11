const validator = require("validator");

module.exports = function validateSignupInput(data) {
  let errors = {};

  if (!validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = "First name must be between 2 and 30 characters";
  }

  if (!validator.isLength(data.lname, { min: 2, max: 30 })) {
    errors.lname = "Last name must be between 2 and 30 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
