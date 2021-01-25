import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    makeStyles,
    Typography,
    Slider
} from '@material-ui/core'


const ViewJob = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)
    const [view, setView] = useState(false)
    const [jobs, setJobs] = useState(null)
    const [apps, setApps] = useState(null)
    const [peeps, setPeeps] = useState(false)
    const [backup, setBackup] = useState(null)
    const [sortName, setSortName] = useState(null)

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

    const deleteJob = () => {
        if(del) {
            return <Redirect to='/deletejob'></Redirect>
        }
    }

    const viewJob = (title) => {
        setView(true)
        getData(title)
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

    const displayJobs = (job, idx) => {
        try {
            return (
                <div>
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
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent 3'
                                type='submit'
                                onClick={() => viewJob(job.title)}>
                            View Applications
                        </button>
                    </div>
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const getData = async (tit) => {    
        try {
            const res = await axios.post('http://localhost:3000/users/rmyapps', {
                title: tit
            })
            if(res.status === 200) {
                console.log(res.data.apps)
                setApps(res.data.apps)
                setBackup(res.data.apps)
                setPeeps(true)
            } else {
                console.log(res.data.someError)
            }
        } catch(err) {
            console.log(err.message)
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

    const displayEdu = (edu, idx) => {
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

    const changeStatus = async (tit, em, st) => {
        try {
            const res = await axios.post('http://localhost:3000/users/status', {
                title: tit,
                email: em,
                status: st
            })
        } catch(err) {
            console.log(err.message)
        }
    }

    const printApp = (app, idx) => {
        try {
            return (
                <div>
                    <hr />
                    <p>
                        <b>Job Title: </b>{app.title}
                    </p>
                    <p>
                        <b>{`Applicant #${idx + 1} name: `}</b> {app.name}
                    </p>
                    <p>
                        <b>Skills: </b>{app.skills.map((skill, idx) => (
                            <div>
                                {displaySkills(skill, idx)}
                            </div>
                        ))}
                    </p>
                    <p>
                        <b>Education: </b>{app.education.map((edu, idx) => (
                            <div>
                                {displayEdu(edu, idx)}
                            </div>
                        ))}
                    </p>
                    <p>
                        <b>SOP: </b>{app.sop}
                    </p>
                    <p>
                        <b>Status: </b>{app.status}
                    </p>
                    <div className='row'>
                        <button className='hoverable blue accent3 waves-light btn waves-effect'
                                style={{margin: '10px'}}
                                onClick={() => changeStatus(app.title, store.user.email, (app.status === 'shortlist' ? 'accept' : 'shortlist'))}>
                            {app.status === 'shortlist' ? 'Accept' : 'Shortlist'}
                        </button>
                        <button className='hoverable blue accent3 waves-light btn waves-effect'
                                onClick={() => changeStatus(app.title, store.user.email, 'reject')}>
                            Reject
                        </button>
                    </div>
                    < hr />
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const nor = () => {
        return (
            <div className='row'>
                <hr/>
                <form className='col s12'>
                    {apps.map((app, idx) => (
                        <div className='app'>
                            {printApp(app, idx)}
                        </div>
                    ))}
                </form>
            </div>
        )
    }

    const printSort = () => {
        if(sortName) {
            setApps([...apps.sort((a, b) => a.name > b.name? 1 : -1)])
        } else if(!sortName) {
            setApps([...apps.sort((a, b) => a.name < b.name? 1 : -1)])
        }
    }

    const formStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    }))

    const dropDown = formStyles()

    const renderView = () => {
        if(peeps) {
            console.log(apps)
            return(
                <div>
                    <Navbar />
                    <div className='container'>
                        <div className='center'>
                            <h2>My Applicants</h2>
                        </div>
                        <div className='row'>
                            <div className='sort name'>
                                <FormControl className={dropDown.formControl}>
                                    <InputLabel id='demo-simple-select-label'>
                                        Name
                                    </InputLabel>
                                    <Select 
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={sortName}
                                        onChange={e => setSortName(e.target.valye)}
                                    >
                                        <MenuItem value={true}>Ascending</MenuItem>
                                        <MenuItem value={false}>Descending</MenuItem>
                                    </Select>
                                </FormControl>
                                <button
                                    style={{marginTop: '20px', marginLeft: '10px'}}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    onClick={() => printSort()}
                                    >
                                    Sort
                            </button>
                            </div>
                        </div>
                        {nor()}
                    </div>
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent 3'
                                type='submit'
                                onClick={() => setView(false)}>
                            Go Back
                        </button>
                    </div>
                </div>
            )
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
                    <div className='col s12' style={{ margin: '10px' }}>
                        <button className='btn waves-effect waves-light hoverable blue accent 3'
                                type='submit'
                                onClick={() => setDel(true)}>
                            Delete
                        </button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                {view? renderView() : renderDisplay()}
                
            </div>
            <div>
                {jobBanao()}
                {editJob()}
                {deleteJob()}
            </div>
        </div>
    )
}

export default ViewJob