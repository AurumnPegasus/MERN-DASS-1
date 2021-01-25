// Importing required frameworks/libraries
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Navbar = () => {

  const [job, setJob] = useState(false)
  const [profile, setProfile] = useState(false)
  const [sign, setSign] = useState(false)
  const [app, setApp] = useState(false)

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

  const viewSign = () => {
    if (sign) {
      localStorage.clear()
      return <Redirect to='/login'></Redirect>
    }
  }

  const viewApp = () => {
    if(app){
      return <Redirect to='/naukar'></Redirect>
    }
  }

  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <button onClick={() => setSign(true)}> Sign Out </button>
              {viewSign()}
            </li>
            <li className="tab">
              <button onClick={() => setApp(true)}> My Applicants </button>
              {viewApp()}
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
