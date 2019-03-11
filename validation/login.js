const validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
