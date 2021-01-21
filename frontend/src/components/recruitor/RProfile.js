import React, { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import Navbar from "./Navbar";
import Context from '../../Context.js'
import { Button, TextField } from "@material-ui/core";

const RProfile = () => {

  const { store } = useContext(Context)
  const [loader, setLoader] = useState(false)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    console.log(store)
    if (store.user !== undefined) {
      setLoader(true)
      console.log(store.user)
      console.log(loader)
    }
  })

  const editProfile = () => {
      if(edit) {
          return <Redirect to='/reditprofile'></Redirect>
      }
  }

  const renderDisplay = () => {
    if (loader) {
        if(store.user.isApplicant)
            return
      return(
        <div>
          <Navbar/>
          <div className='header center'>
            <h3><b>My Profile</b></h3>
          </div>
          <div className='row container'>
            <form className='col s12'>
              <div className='row center'>
                <img src={store.user.profile} alt='Profile Image'
                className='circle'
                    style={{ maxHeight: '100px', 
                              maxWidth: '100px'}}/>
              </div>
              <div className='row center'>
                <div className='input-field col s4'>
                  <input disabled
                        id='username'
                        type='text'
                        className='validate'/>
                  <label htmlFor='username'>
                    <b>Username: </b>{store.user.name}
                  </label>     
                </div>
                <div className='input-field col s3'>
                  <input disabled
                        id='isApplicant'
                        type='text'
                        className='validate'/>
                  <label htmlFor='isApplicant'>
                    <b>Category: </b>{store.user.isApplicant? 'Applicant': 'Recruitor'}
                  </label>     
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s5'>
                  <input disabled
                        id='email'
                        type='email'
                        className='validate'/>
                  <label htmlFor='email'>
                    <b>Email: </b>{store.user.email}
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                    <textarea id='bio'
                    disabled
                    type='text'
                    className='materialize-textarea' 
                    />
                    <label htmlFor='bio'>
                        <b>BIO: </b>{store.user.bio}
                    </label>
                </div>
              </div>
              <div className='row'>
                  <div className='input-field col s12'>
                      <TextField
                        id='contact'
                        inputProps={{
                            maxlength: 9
                        }}
                        ></TextField>
                        <label htmlFor='contact'>
                            <b>Contact: </b>{store.user.contact}
                        </label>
                  </div>
              </div>
            </form>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
        <div>
            {renderDisplay()}
        </div>
        <div>
            {editProfile()}
        </div>
    </div>
  );
};

export default RProfile;
