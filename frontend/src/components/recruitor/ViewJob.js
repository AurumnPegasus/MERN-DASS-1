import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'

const ViewJob = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [jobs, setJobs] = useState(null)

    const jobBanao = () => {
        if(create) {
            return <Redirect to='/createjob'></Redirect>
        }
    }

    const editJob = () => {
        if(edit) {
            return <Redirect to='/editjob'></Redirect>
        }
    }

    useEffect(() => {
        async function timepass() {
            if(loader) return
            if (store.user !== undefined) {
                const jobList = await axios.post('http://localhost:3000/jobs/rjob', {
                    email: store.user.email
                })
                setJobs(jobList.data.jobs)
                console.log(jobs)
                setLoader(true)
            }
        }

        timepass()
    })

    const displaySkill = (skill, sidx) => {
        try {
            if (skill.name.length === 0) return
            return (
                <div>
                    <p>
                        <b>{`Skill ${sidx + 1}: `}</b> {skill.name}
                    </p>
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const deleteMe = async (title) => {
        try {
            const res = axios.post('http://localhost:5000/jobs/deletejob', {
                title
            })
            console.log(res)
        } catch (err) {
            console.log(err.message)
        }
    }

    const displayJobs = (job, idx) => {
        try {
            return (
                <div>
                    <hr />
                    <p>
                        <b>{`Job ${idx + 1} title: `}</b> {job.title}
                    </p>
                    <p>
                        <b>{`by: `}</b> {job.name}
                    </p>
                    <p>
                        <b>{`mail: `}</b> {job.email}
                    </p>
                    <p>
                        <b>{`max applicants: `}</b> {job.applicants}
                    </p>
                    <p>
                        <b>{`max positions: `}</b> {job.positions}
                    </p>
                    <div>
                        {job.skills.map((skill, sidx) => (
                            <div className='skill'>
                                {displaySkill(skill, sidx)}
                            </div>
                        ))}
                    </div>
                    <p>
                        <b>{`job type: `}</b> {job.jobtype}
                    </p>
                    <p>
                        <b>{`job duration: `}</b> {job.duration}
                    </p>
                    <p>
                        <b>{`salary: `}</b> {`$ ${job.salary}`}
                    </p>
                    <button onClick={() => deleteMe(job.title)}>
                        Delete Job
                    </button>
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const renderDisplay = () => {
        console.log(loader)
        if (loader) {
            return(
                <div>
                    <Navbar/>
                    <div className='header center'>
                        <h3><b>View Jobs</b></h3>
                    </div>
                    <div className='row container'>
                        <form className='col s12'>
                            <div className='row center'>
                                {jobs.map((job, idx) => (
                                    <div className='job'>
                                        {displayJobs(job, idx)}
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent 3'
                            type='submit'
                            onClick={() => setCreate(true)}
                        >Create</button>
                    </div>
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent 3'
                            type='submit'
                            onClick={() => setEdit(true)}
                        >Edit</button>
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
                {jobBanao()}
                {editJob()}
            </div>
        </div>
    )
}

export default ViewJob