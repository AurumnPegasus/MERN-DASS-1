import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import classnames from 'classnames'

const CreateJob = () => {
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
    const [errors, setErrors] = useState({})
    const [back, setBack] = useState(false)
    const [deadline, setDeadline] = useState('')
    
    useEffect(() => {
        if(loader) return
        if(store.user !== undefined) {
            setLoader(true)
            setName(store.user.name)
            setEmail(store.user.email)
        }
    })
    
    const goBack = () => {
        if(back) {
            return <Redirect to='/viewjob'></Redirect>
        }
    }

    const createMe = async () => {
        try {
            const res = await axios.post('http://localhost:5000/jobs/createjob', {
                title,
                name,
                email,
                applicants,
                positions,
                skills,
                jobtype,
                duration,
                salary,
                deadline
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
                setDeadline('')
                console.log('Success')
            } else if(res.data.title){
                setErrors({ title: res.data.title })
            } else if(res.data.applicants) {
                setErrors({ applicants: res.data.applicants })
            } else if(res.data.positions) {
                setErrors({ positions: res.data.positions })
            } else if(res.data.jobtype) {
                setErrors({ jobtype: res.data.jobtype })
            } else if(res.data.duration) {
                setErrors({ duration: res.data.duration })
            } else if(res.data.salary) {
                setErrors({ salary: res.data.salary })
            } else if(res.data.deadline) {
                setErrors({ deadline: res.data.deadline })
            } else {
                console.log(res.data.someError)
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    const handleSkillNameChange = idx => e => {
        const newSkills = skills.map((skill, sidx) => {
            if (idx !== sidx) return skill
            return { ...skill, name: e.target.value }
        })
        setSkills(newSkills)
    }

    const handleSkillRemove = idx => () => {
        setSkills(skills.filter((s, sidx) => idx !== sidx))
    }

    const renderDisplay = () => {
        if(loader) {
            return(
                <div className='container'>
                    <Form>
                        <Form.Group controid='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                className={classnames('', { invalid: errors.title })}
                                type='text'
                                plaintext
                                defaultValue={title}
                                onChange={e => setTitle(e.target.value)}
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
                            <Form.Label>Title</Form.Label>
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
                            {skills.map((skill, idx) => (
                                <div className='skill'>
                                    <input 
                                        type='text'
                                        placeholder={`Skill #${idx + 1} name`}
                                        value={skill.name}
                                        onChange={handleSkillNameChange(idx)}
                                    />
                                    <button 
                                        type='button'
                                        onClick={handleSkillRemove(idx)}
                                        className='small waves-effect waves-light btn hoverable blue accent3'
                                        style={{ margin: '10px' }}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                            <button 
                                type='button'
                                onClick={() => setSkills(skills.concat([{ name: '' }]))}
                                className='small waves-effect waves-light btn hoverable blue accent3'
                                style={{ margin: '10px' }}
                            >
                                Add Skill
                            </button>
                        </Form.Group>
                        <Form.Group controid='job type'>
                            <Form.Label>Job Type</Form.Label>
                            <Form.Control 
                                className={classnames('', {invalid:errors.jobtype})}
                                type='text'
                                plaintext
                                defaultValue={jobtype}
                                onChange={e => setJobtype(e.target.value)}
                            />
                            <span className='red-text'>{errors.jobtype}</span>
                        </Form.Group>
                        <Form.Group controid='months'>
                            <Form.Label>Duration of Job</Form.Label>
                            <Form.Control 
                                className={classnames('', {invalid:errors.duration})}
                                type='number'
                                plaintext
                                defaultValue={duration}
                                onChange={e => setDuration(e.target.value)}
                            />
                            <span className='red-text'>{errors.duration}</span>
                        </Form.Group>
                        <Form.Group controid='salary'>
                            <Form.Label>Salary of Job</Form.Label>
                            <Form.Control 
                                className={classnames('', {invalid: errors.salary})}
                                type='number'
                                plaintext
                                defaultValue={salary}
                                onChange={e => setSalary(e.target.value)}
                            />
                            <span className='red-text'>{errors.salary}</span>
                        </Form.Group>
                        <Form.Group controid='deadline'>
                            <Form.Label>Deadline for Applications</Form.Label>
                            <Form.Control 
                                className={classnames('', {invalid: errors.deadline})}
                                type='text'
                                plaintext
                                defaultValue={deadline}
                                onChange={e => setDeadline(e.target.value)}
                            />
                            <span className='red-text'>{errors.deadline}</span>
                        </Form.Group>
                    </Form>
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent3'
                        type='submit'
                        onClick={() => createMe()}>
                            <i className='material-icons right'>send</i>
                            Create
                        </button>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <div>
                {renderDisplay()}
            </div>
            <div>
                {goBack()}
            </div>
        </div>
    )
}

export default CreateJob