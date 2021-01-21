import React, { useState, useContext, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Context from "../../Context";
import FileBase from "react-file-base64";
import { Form } from "react-bootstrap";
import axios from 'axios'
import { TextField } from '@material-ui/core'
import classnames from 'classnames'

const REditProfile = () => {
  const { store, setStore } = useContext(Context);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [loader, setLoader] = useState(false)
  const [profLoad, setProfLoad] = useState(false)
  const [errors, setErrors] = useState({})


  const goBack = () => {
    if(profLoad) {
      return <Redirect to='/rprofile'></Redirect>
    }
  }

  useEffect(() => {
    if(loader) return
    if (store.user !== undefined) {
      setLoader(true)
      setName(store.user.name)
      setProfile(store.user.profile)
      setContact(store.user.contact)
      setBio(store.user.bio)
    } 
  }, [loader, store.user])

  async function editMe() {
    try {
      let res = await axios.post('http://localhost:5000/users/reditprofile', {
        name,
        email: store.user.email,
        isApplicant: store.user.isApplicant,
        pass: store.user.pass,
        profile,
        contact,
        bio
      })
      if (res.status === 200){
        console.log('Success')
        setProfLoad(true)
        setStore({ ...store, user: res.data.user })
      } else if (res.data.contact) {
        setErrors({ contact: res.data.contact })
       } else if (res.data.bio) {
        setErrors({ bio: res.data.bio })
       } else {
           setErrors({ someError: res.data.someError })
       }
    } catch (err) {
      console.log(err.message)
    }
  }

  const renderDisplay = () => {
    if (loader) {
      return (
        <div className="container">
          <Form>
            <Form.Group controlid="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                plaintext
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlid="email">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                plaintext
                defaultValue={store.user.email}
                readOnly
              />
            </Form.Group>
            <Form.Group controlid="isApplicant">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                plaintext
                defaultValue={store.user.isApplicant ? "Applicant" : "Recruitor"}
                readOnly
              />
            </Form.Group>
            <Form.Group controlid="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                className={classnames('', { invalid: errors.contact })}
                type="text"
                plaintext
                defaultValue={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <span className='red-text'>{errors.contact}</span>
            </Form.Group>
            <Form.Group controlid="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                plaintext
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
                className={classnames('', { invalid: errors.bio })}
              />
              <span className='red-text'>{errors.bio}</span>
            </Form.Group>
            <Form.Group controlid='profile'>
              <div
                className="waves-effect waves-light btn hoverable blue accent3"
                style={{ margin: "5px" }}
              >
                <FileBase
                  id="profile"
                  type="file"
                  multiple={false}
                  onDone={(file) => setProfile(file.base64)}
                ></FileBase>
                <label htmlFor="profile" className="white-text">
                  Profile
                </label>
              </div>
            </Form.Group>
          </Form>
          <div className='col s12' style={{ margin: '10px' }}>
            <button className='btn waves-effect waves-light hoverable blue accent3'
              type='submit'
              onClick={() => editMe()}>
                <i className='material-icons right'>send</i>
                Edit
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div>
        {renderDisplay()}
      </div>
      <div>
        {goBack()}
      </div>
    </div>
  )


};

export default REditProfile;