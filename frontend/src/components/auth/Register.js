import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  makeStyles,
} from "@material-ui/core";

const Register = () => {
  //  console.log("At register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isApplicant, setIsApplicant] = useState(true);
  const [pass, setPass] = useState("");
  const [conf_pass, setConf_pass] = useState("");
  const [errors, setErrors] = useState({});

  const newUser = {
    name,
    email,
    isApplicant,
    pass,
    conf_pass,
  };

  const formStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const dropDown = formStyles();

  async function registerMe() {
    //    console.log(newUser);
    try {
      let res = await axios.post("http://localhost:5000/users/register", {
        name: newUser.name,
        email: newUser.email,
        isApplicant: newUser.isApplicant,
        pass: newUser.pass,
        conf_pass: newUser.conf_pass,
      });
      console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  }

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
              <Link to="/login"> Log in</Link>
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
            <div className="is applicant">
              <FormControl className={dropDown.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isApplicant}
                  onChange={(e) => setIsApplicant(e.target.value)}
                >
                  <MenuItem value={true}>Applicant</MenuItem>
                  <MenuItem value={false}>Recruiter</MenuItem>
                </Select>
              </FormControl>
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                onClick={() => registerMe()}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
