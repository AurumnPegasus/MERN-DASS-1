// Importing required frameworks/libraries
import React, { useState } from "react";
import { Link, BrowserRouter, Redirect } from "react-router-dom";

const Navbar = () => {

  const [job, setJob] = useState(false)
  const [profile, setProfile] = useState(false)
  const [apps, setApps] = useState(false)
  const [sign, setSign] = useState(false)

  const viewProfile = () =>{
    if(profile) return <Redirect to='/profile'></Redirect>
  }

  const viewJob = () => {
    if (job) return <Redirect to='/aviewjob'></Redirect>
  }
  
  const viewApps = () => {
    if (apps) return <Redirect to='/myapps'></Redirect>
  }
  
  const viewSign = () => {
    if(sign) {
      localStorage.clear()
      return <Redirect to='/login'></Redirect>
    }
  }

  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <button onClick={() => setApps(true)}>My Applications</button>
              {viewApps()}
            </li>
            <li className="tab">
              <button onClick={() => setJob(true)}>Job</button>
              {viewJob()}
            </li>
            <li className="tab">
              <button onClick={() => setProfile(true)}>My Profile</button>
              {viewProfile()}
            </li>
            <li className="tab">
              <button onClick={() => setSign(true)}>Sign out</button>
              {viewSign()}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
