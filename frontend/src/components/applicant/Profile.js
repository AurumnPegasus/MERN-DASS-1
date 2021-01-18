import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Context from '../../Context.js'

const Profile = () => {

  const { store } = useContext(Context)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    console.log(store)
    if (store.user !== undefined) {
      setLoader(true)
      console.log(loader)
    }
  })

  const renderDisplay = () => {
    if (loader) {
      return(
      <div>
      <Navbar />
      <div className="center-align verticle-align">
          <div className="divider"></div>
          <div className="section">
            <img
              className="circle responsive-img"
              src={store.user.profile}
              alt="profile"
              style={{
                marginTop: "5vh",
                maxWidth: "100px",
                maxHeight: "100px",
              }}
            />
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Hey <b>{store.user.name}</b>,</h5>
            <h6>Here are your essential details:</h6>
            <p>
              <b>Email: </b> {store.user.email}
            </p>
            <p>
              <b>Category: </b>
              {store.user.isApplicant ? "Applicant" : "Recruiter"}
            </p>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Additional Details</h5>
            <p>Stuff</p>
          </div>
        </div>
    </div>)
    }
  }

  return (
    <div>
      {renderDisplay()}
    </div>
  );
};

export default Profile;
