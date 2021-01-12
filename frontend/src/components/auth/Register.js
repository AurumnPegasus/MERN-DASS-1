import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  console.log("At register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf_pass, setConf_pass] = useState("");
  const [errors, setErrors] = useState({});

  const newUser = {
    name,
    email,
    pass,
    conf_pass,
  };

  console.log(newUser);

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.25px" }}>
            <h4>
              <b>Register</b>below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account?
              <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                value={name}
                error={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                error={errors.pass}
                id="pass"
                type="password"
              />
              <label htmlFor="pass">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setConf_pass(e.target.value)}
                value={conf_pass}
                error={errors.conf_pass}
                id="conf_pass"
                type="password"
              />
              <label htmlFor="conf_pass">Confirm Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.25px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
