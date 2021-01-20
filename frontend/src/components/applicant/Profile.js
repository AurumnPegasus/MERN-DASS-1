import React, { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import Navbar from "./Navbar";
import Context from '../../Context.js'
import { Button } from "@material-ui/core";

const Profile = () => {

  const { store } = useContext(Context)
  const [loader, setLoader] = useState(false)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    console.log(store)
    if (store.user !== undefined) {
      setLoader(true)
      console.log(loader)
    }
  })

  const editProfile = () => {
    if(edit) {
      return <Redirect to='/editprofile'></Redirect>
    }
  }

  const displayEducation = (edu, idx) => {
    try {
      if(edu.name.length >0 && edu.join.length >0 && edu.leave.length >0) {
        return( <div>
                  <input type='text' 
                    disabled
                    value={`Institute #${idx + 1} name: ${edu.name}`}
                  />
                  <input type='text'
                    disabled
                    value={`Joining date: ${edu.join}`}
                  />
                  <input type='text'
                    disabled
                    value={`Left on: ${edu.leave}`}
                  />
                </div>
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const displaySkills = (skill, idx) => {
    try {
      if(skill.name.length >0){
        return(
          <div>
            <input type='text'
              disabled
              value={`Skill #${idx + 1} name: ${skill.name}`}
            />
          </div>
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const renderDisplay = () => {
    if (loader) {
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
                  <label for='username'>
                    <b>Username: </b>{store.user.name}
                  </label>     
                </div>
                <div className='input-field col s3'>
                  <input disabled
                        id='isApplicant'
                        type='text'
                        className='validate'/>
                  <label for='isApplicant'>
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
                  <label for='email'>
                    <b>Email: </b>{store.user.email}
                  </label>
                </div>
              </div>
              <div>
                {store.user.education.map((edu, idx) => (
                  <div className="education">
                    {displayEducation(edu, idx)}
                  </div>
                ))}
              </div>
              <div>
                {store.user.skills.map((skill, idx) => (
                  <div>
                    {displaySkills(skill, idx)}
                  </div> 
                ))}
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

export default Profile;
