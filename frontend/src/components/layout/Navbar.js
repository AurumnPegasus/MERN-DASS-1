// Importing required frameworks/libraries
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

// Creating a Navbar component directly
const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <BrowserRouter>
          <Link
            to="/"
            style={{ fontFamily: "monospace" }}
            className="col s5 brand-logo center blac-text"
          >
            <i className="material-icons">code</i>
          </Link>
        </BrowserRouter>
      </nav>
    </div>
  );
};

export default Navbar;
