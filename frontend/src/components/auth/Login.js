import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState("");

  const userData = {
    email,
    pass,
  };
  //  console.log(userData);
  const getMeData = (email, pass) => {
    axios.post("http://localhost:5000/", { email, pass }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <Link to="/" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to Home
        </Link>
        <div className="col s12" style={{ paddingLeft: "11.25px" }}>
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
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
          <div className="col s12" style={{ paddingLeft: "11.25px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              className="btn btn=large waves-effect waves-light hoverable blue accent-3"
              onClick={(email, pass) => getMeData()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
