// Importing required frameworks/libraries
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Context from "./Context.js";
import axios from "axios";

// Importing required files
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/applicant/Profile";
import EditProfile from './components/applicant/EditProfile'
import RProfile from './components/recruitor/RProfile'
import REditProfile from './components/recruitor/REditProfile'
import ViewJob from './components/recruitor/ViewJob'
import CreateJob from './components/recruitor/CreateJob'
import EditJob from './components/recruitor/EditJob'
import AViewJob from './components/applicant/ViewJob'
import MyApplications from './components/applicant/MyApplications'
import DeleteJob from './components/recruitor/DeleteJob'

const App = () => {
  const [store, setStore] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async() => {
      let token = localStorage.getItem('token')
      if (token === null){
        localStorage.setItem('token', '')
        token = ''
      } else {
        try {
          const res = await axios.post('http://localhost:5000/users/profile', {
            token
          })
        //  console.log(res.data)
          if (res.status === 200) {
            setStore({
              token: token,
              user: res.data.user
            })
            
          } else {
            console.log('Failure')
          }
        } catch (err) {
          console.log(err.message)
        }
      }
    }

    checkLoggedIn()
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Context.Provider value={{ store, setStore }}>
          <div className="Routes">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path='/editprofile' component={EditProfile} />
            <Route exact path='/rprofile' component={RProfile} />
            <Route exact path='/reditprofile' component={REditProfile} />
            <Route exact path='/viewjob' component={ViewJob} />
            <Route exact path='/createjob' component={CreateJob} />
            <Route exact path='/editjob' component={EditJob} />
            <Route exact path='/aviewjob' component={AViewJob} />
            <Route exact path='/myapps' component={MyApplications} />
            <Route exact path='/deletejob' component={DeleteJob} />
          </div>
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
