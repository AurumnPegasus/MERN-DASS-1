import React, { useState, useContext, useEffect } from "react";
import Context from "../../Context";
import FileBase from "react-file-base64";
import { Form } from "react-bootstrap";
import axios from 'axios'

const EditProfile = () => {
  const { store } = useContext(Context);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [education, setEducation] = useState(null);
  const [loader, setLoader] = useState(false)
  const [skills, setSkills] = useState(null)

  const handleSkillNameChange = (idx) => (e) => {
    const newSkills = skills.map((skill, sidx) => {
      if (idx !== sidx) return skill;
      return { ...skill, name: e.target.value }
    })
    setSkills(newSkills)
  }

  const handleEducationNameChange = (idx) => (e) => {
    const newEducation = education.map((edu, sidx) => {
      if (idx !== sidx) return edu;
      return { ...edu, name: e.target.value };
    });
    setEducation(newEducation);
  };

  const handleEducationJoinChange = (idx) => (e) => {
    const newEducation = education.map((edu, sidx) => {
      if (idx !== sidx) return edu
      return { ...edu, join: e.target.value }
    })
    setEducation(newEducation)
  }

  const handleEducationLeaveChange = (idx) => (e) => {
    const newEducation = education.map((edu, sidx) => {
      if (idx !== sidx) return edu
      return { ...edu, leave: e.target.value }
    })
    setEducation(newEducation)
  }

  const handleEducationRemove = (idx) => () => {
    setEducation(education.filter((s, sidx) => idx !== sidx));
  };

  const handleSkillRemove = (idx) => () => {
    setSkills(skills.filter((s, sidx) => idx !== sidx))
  }

  useEffect(() => {
    if(loader) return
    if (store.user !== undefined) {
      setLoader(true)
      setName(store.user.name)
      setProfile(store.user.profile)
      setEducation(store.user.education)
      setSkills(store.user.skills)
    } 
  }, [loader, store.user])

  async function editMe() {
    try {
      let res = await axios.post('http://localhost:5000/users/editprofile', {
        name,
        email: store.user.email,
        isApplicant: store.user.isApplicant,
        pass: store.user.pass,
        profile,
        education,
        skills
      })
      if (res.status === 200){
        console.log('Success')
      } else if (res.data.updateError) {
        console.log(res.data.updateError)
      } else {
        console.log(res.data.someError)
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
            <Form.Group controlid="education">
              {education.map((edu, idx) => (
                <div className="education">
                  <input
                    type="text"
                    placeholder={`Institute #${idx + 1} name`}
                    value={edu.name}
                    onChange={handleEducationNameChange(idx)}
                  />
                  <input 
                    type='text'
                    placeholder={`Join date`}
                    value={edu.join}
                    onChange={handleEducationJoinChange(idx)}
                  />
                  <input 
                    type='text'
                    placeholder={`Leave date`}
                    value={edu.leave}
                    onChange={handleEducationLeaveChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={handleEducationRemove(idx)}
                    className="small waves-effect waves-light btn hoverable blue accent3"
                    style={{ margin: "5px" }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEducation(education.concat([{ name: "", join: "", leave: "" }]))}
                className="small waves-effect waves-light btn hoverable blue accent3"
                style={{ margin: "5px" }}
              >
                Add Education
              </button>
            </Form.Group>
            <Form.Group controlid='skills'>
              {skills.map((skill, idx) => (
                <div className='skill'>
                  <input 
                    type='text'
                    placeholder={`Skill #${idx + 1} name`}
                    value={skill.name}
                    onChange={handleSkillNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={handleSkillRemove(idx)}
                    className="small waves-effect waves-light btn hoverable blue accent3"
                    style={{ margin: "5px" }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSkills(skills.concat([{ name: "" }]))}
                // onClick={() => skillClicked()}
                className="small waves-effect waves-light btn hoverable blue accent3"
                style={{ margin: "5px" }}
              >
                Add Skill
              </button>
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
    </div>
  )


};

export default EditProfile;
