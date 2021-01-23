// Importing required frameworks/libraries
import React, { useState } from "react";
import { Link, BrowserRouter, Redirect } from "react-router-dom";

const Navbar = () => {

  const [job, setJob] = useState(false)
  const [profile, setProfile] = useState(false)

  const viewProfile = () => {
    if (profile) {
      return <Redirect to='/rprofile'></Redirect>
    }
  }

  const viewJob = () => {
    if (job){
      return <Redirect to='/viewjob'></Redirect>
    }
  }

  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <BrowserRouter>
                <Link to="/">One</Link>
              </BrowserRouter>
            </li>
            <li className="tab">
              <button onClick={() => setJob(true)}>Job</button>
              {viewJob()}
            </li>
            <li className="tab">
            <button onClick={() => setProfile(true)}>My Profile</button>
              {viewProfile()}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;