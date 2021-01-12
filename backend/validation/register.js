import validator from "validator";
import isEmpty from "is-empty";

export default (data) => {
  let errors = {};
  console.log(data);
  // Empty fields to strings
  let name = !isEmpty(data.name) ? data.name : "";
  let email = !isEmpty(data.email) ? data.email : "";
  let pass = !isEmpty(data.pass) ? data.pass : "";
  let conf_pass = !isEmpty(data.conf_pass) ? data.conf_pass : "";

  // Checks
  if (validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid email";
  }

  if (validator.isEmpty(pass)) {
    errors.pass = "Password field is required";
  }

  if (validator.isEmpty(conf_pass)) {
    errors.conf_pass = "Confirm Password field is required";
  }

  // Password checks
  if (!validator.isLength(pass, { min: 6, max: 50 })) {
    errors.pass =
      "Password must be atleast 6 characters and atmost 50 characters";
  }

  if (!validator.equals(pass, conf_pass)) {
    errors.conf_pass = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
