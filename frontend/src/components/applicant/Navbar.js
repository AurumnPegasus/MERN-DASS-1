// Importing required frameworks/libraries
import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="nav-extended">
        <div class="nav-wrapper">
          <a className="brand-logo"></a>
          <a data-target="mobile-demo" className="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <BrowserRouter>
                <Link to="/">One</Link>
              </BrowserRouter>
            </li>
            <li>
              <BrowserRouter>
                <Link to="/">Two</Link>
              </BrowserRouter>
            </li>
            <li>
              <BrowserRouter>
                <Link to="/">Three</Link>
              </BrowserRouter>
            </li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <BrowserRouter>
                <Link to="/">One</Link>
              </BrowserRouter>
            </li>
            <li class="tab">
              <BrowserRouter>
                <Link to="/">Two</Link>
              </BrowserRouter>
            </li>
            <li class="tab">
              <BrowserRouter>
                <Link to="/">Three</Link>
              </BrowserRouter>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
