// Importing required frameworks/libraries
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

const Navbar = () => {
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
              <BrowserRouter>
                <Link to="/">Two</Link>
              </BrowserRouter>
            </li>
            <li className="tab">
              <BrowserRouter>
                <Link to="/profile">My Profile</Link>
              </BrowserRouter>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
