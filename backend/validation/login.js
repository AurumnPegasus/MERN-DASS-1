// Importing required framework/libraries
import validator from "validator";
import isEmpty from "is-empty";

export default (data) => {
  let errors = {};
  console.log(data.email);
  let email = !isEmpty(data.email) ? data.email : "";
  let pass = !isEmpty(data.pass) ? data.pass : "";

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(pass)) {
    errors.pass = "Password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
