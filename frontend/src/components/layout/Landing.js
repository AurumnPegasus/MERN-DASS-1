// Importing required frameworks/libraries
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// Creating the Landing Page
const Landing = () => {
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Job</b> Portal
            {/*<span style={{ fontFamily: "monospace" }}>MERN</span> stack from*/}
          </h4>
          <p className="flow-text grey-text text-darken-1">
            A Portal to effeciently Apply and Recruit.
          </p>
          <br />
          {/* Register button */}
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          {/* Login button */}
          <div className="col s6">
            <Link to="login">
              <Button
                //to="/login"
                variant="outlined"
                className="btn btn-large btn-flat waves-effect blue-text "
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
