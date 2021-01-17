// Importing required frameworks/libraries
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Context from './Context.js'

// Importing required files
import "./App.css";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from './components/applicant/Profile'

const App = () => {

  const [store, setStore] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    setStore(localStorage.getItem('userData'))
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Context.Provider value={{ store, setStore }}>
          <div className="Routes">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/profile' component={Profile}/>
          </div>
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
