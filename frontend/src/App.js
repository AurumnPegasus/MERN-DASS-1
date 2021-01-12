// Importing required frameworks/libraries
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Importing required files
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Nav">
          <Navbar />
        </div>
        <div className="Routes">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
