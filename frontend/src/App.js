// Importing required frameworks/libraries
import React from "react";

// Importing required files
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Landing />
    </div>
  );
};

export default App;
