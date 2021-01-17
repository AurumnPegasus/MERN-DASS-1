import React, { useContext } from "react";
import Navbar from "./Navbar";
import Context from '../../Context.js'

const Profile = () => {
  const { store } = useContext(Context)
  return (
    <div>
      <Navbar />
      <p>{store.user.name}</p>
    </div>
  );
};

export default Profile;
