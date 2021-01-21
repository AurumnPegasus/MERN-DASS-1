import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import classnames from 'classnames'

const EditJob = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [applicants, setApplicants] = useState(0)
    const [positions, setPositions] = useState(0)
    const [skills, setSkills] = useState([{ name: "" }])
    const [jobtype, setJobtype] = useState('')
    const [duration, setDuration] = useState(0)
    const [salary, setSalary] = useState(0) 
    const [nerrors, setNErrors] = useState({})
    const [back, setBack] = useState(false)
    const [etitle, setEtitle] = useState('')
    const [see, setSee] = useState(false)
    const [load, setLoad] = useState(false) 
    const [errors, setErrors] = useState({}) 
     
    useEffect(() => {
        if(loader) return
        if(store.user !== undefined) {
            setLoader(true)
            setName(store.user.name)
            setEmail(store.user.email)
            setSee(true)
        }
    })
    
    const goBack = () => {
        if(back) {
            return <Redirect to='/viewjob'></Redirect>
        }
    }

    const editMe = async () => {
        try {
            console.log('here')
            const res = await axios.post('http://localhost:5000/jobs/getjob', {
                etitle
            })
            console.log(res)
            console.log(etitle)
            if (res.status === 200) {
                console.log('Success')
                setTitle(res.data.job.title)
                setApplicants(res.data.job.applicants)
                setPositions(res.data.job.positions)
                setSkills(res.data.job.skills)
                setJobtype(res.data.job.jobtype)
                setSalary(res.data.job.salary)
                setNErrors({})
                setSee(false)
                setLoad(true)
            } else if(res.data.title) {
                setNErrors({ title: res.data.title})
            } else {
                setNErrors({ someError: res.data.someError })
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const createMe = async () => {
        try {
            const res = await axios.post('http://localhost:5000/jobs/editjob', {
                title,
                name,
                email,
                applicants,
                positions,
                skills,
                jobtype,
                duration,
                salary
            })
            console.log(res)
            if(res.status === 200) {
                setTitle('')
                setApplicants(0)
                setPositions(0)
                setSkills([{name: ''}])
                setJobtype('')
                setDuration(0)
                setSalary(0)
                setErrors({})
                setBack(true)
                console.log('Success')
            } else if(res.data.applicants) {
                setErrors({ applicants: res.data.applicants })
            } else if(res.data.positions) {
                setErrors({ positions: res.data.positions })
            } else {
                console.log(res.data.someError)
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    const acceptInput = () => {
        if(see) {
            return (
                <div className='container'>
                    <Form>
                        <Form.Group controlid='etitle'>
                            <Form.Label>Title of Job</Form.Label>
                            <Form.Control
                                className={classnames('', { invalid: nerrors.title })}
                                type='text'
                                plaintext
                                defaultValue={etitle}
                                onChange={e => setEtitle(e.target.value)}
                            />
                            <span className='red-text'>{nerrors.title}</span>
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
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent3'
                        type='submit'
                        onClick={() => setBack(true)}>
                            Go Back 
                        </button>
                    </div>
                </div>
            )
        }
    }

    const renderDisplay = () => {
        if(!load) return
        return(
            <div className='container'>
                <Form>
                    <Form.Group controid='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type='text'
                            plaintext
                            defaultValue={title}
                            readOnly
                        />
                        <span className='red-text'>{errors.title}</span>
                    </Form.Group>
                    <Form.Group controid='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text'
                            plaintext
                            defaultValue={name}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controid='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email'
                            plaintext
                            defaultValue={email}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controid='applicants'>
                        <Form.Label>Max number of Applicants</Form.Label>
                        <Form.Control 
                            className={classnames('', {invaid: errors.applicants})}
                            type='number'
                            plaintext
                            defaultValue={applicants}
                            onChange={e => setApplicants(e.target.value)}
                        />
                        <span className='red-text'>{errors.applicants}</span>
                    </Form.Group>
                    <Form.Group controid='positions'>
                        <Form.Label>Max number of Positons</Form.Label>
                        <Form.Control 
                            className={classnames('', {invalid: errors.positions})}
                            type='number'
                            plaintext
                            defaultValue={positions}
                            onChange={e => setPositions(e.target.value)}
                        />
                        <span className='red-text'>{errors.positions}</span>
                    </Form.Group>
                    <Form.Group controlid='skills'>
                        <Form.Label>Skills</Form.Label>
                        {skills.map((skill, idx) => (
                            <div className='skill'>
                                <input 
                                    type='text'
                                    placeholder={`Skill #${idx + 1} name`}
                                    value={skill.name}
                                    readOnly
                                />
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group controid='job type'>
                        <Form.Label>Job Type</Form.Label>
                        <Form.Control 
                            type='text'
                            plaintext
                            defaultValue={jobtype}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controid='months'>
                        <Form.Label>Duration of Job</Form.Label>
                        <Form.Control 
                            type='number'
                            plaintext
                            defaultValue={duration}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controid='salary'>
                        <Form.Label>Salary of Job</Form.Label>
                        <Form.Control 
                            type='number'
                            plaintext
                            defaultValue={salary}
                            readOnly
                        />
                    </Form.Group>
                </Form>
                <div className='col s12' style={{ margin: '10px' }}>
                    <button className='btn waves-effect waves-light hoverable blue accent3'
                    type='submit'
                    onClick={() => createMe()}>
                        <i className='material-icons right'>send</i>
                        Edit
                    </button>
                </div>
            </div>
        )
}

    return(
        <div>
            <div>
                {acceptInput()}
            </div>
            <div>
                {renderDisplay()}
            </div>
            <div>
                {goBack()}
            </div>
        </div>
    )
}

export default EditJob