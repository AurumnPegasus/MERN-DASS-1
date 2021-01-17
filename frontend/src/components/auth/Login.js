import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import Context from '../../Context.js'

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState("");
  const [redir, setRedir] = useState(false);
  const { setStore } = useContext(Context)

  const userData = {
    email,
    pass,
  };

  const redirectHandler= () => {
    if (redir) {
      return <Redirect to='/profile'></Redirect>
    }
  }

  async function getMeData() {
    try {
      let res = await axios.post("http://localhost:5000/users/login", {
        email: userData.email,
        pass: userData.pass,
      });
      if (res.status === 200) {
        setErrors({});
        setEmail("");
        setPass("");
        localStorage.setItem("token", res.data.token);
        setStore({
          token: res.data.token,
          user: res.data.user
        })
        setRedir(true)
        console.log('Success')
      } else if (res.data.email) {
        setErrors({ email: res.data.email });
      } else if (res.data.pass) {
        setErrors({ pass: res.data.pass });
      } else {
        setErrors({ someError: res.data.someError });
      }
    } catch (err) {
      console.log(err);
    }
  }

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
            <Link to="/register"> Register</Link>
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
              className={classnames("", {
                invalid: errors.email,
              })}
            />
            <label htmlFor="email">Email</label>
            <span className="red-text">{errors.email}</span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              error={errors.pass}
              id="pass"
              type="password"
              className={classnames("", {
                invalid: errors.pass,
              })}
            />
            <label htmlFor="pass">Password</label>
            <span className="red-text">{errors.pass}</span>
          </div>
          <div
            className={classnames("", {
              invalid: errors.someError,
            })}
          >
            <span className="red-text">{errors.someError}</span>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.25px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              onClick={() => getMeData()}
            >
              Login
            </Button>
          </div>
        </form>
        {redirectHandler()}
      </div>
    </div>
  );
};

export default Login;
