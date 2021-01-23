import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    makeStyles,
    Typography,
    Slider
} from '@material-ui/core'

const AViewJob = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [jobs, setJobs] = useState(null)
    const [jobtype, setJobtype] = useState('')
    const [salary, setSalary] = useState([0, 100])
    const [duration, setDuration] = useState(null)
    const [sortSal, setSortSal] = useState(null)
    const [sortDur, setSortDur] = useState(null)

    useEffect(() => {
        async function timepass() {
            if(loader) return
            if (store.user !== undefined) {
                const jobList = await axios.get('http://localhost:3000/jobs/viewjob')
                setJobs(jobList.data.jobs)
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
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const limitJobs = (job, idx) => {
        if(duration === null) {
            if (jobtype === '' && (job.salary > salary[0] && job.salary < salary[1])) {
                return displayJobs(job, idx)
            } else if( job.jobtype === jobtype && (job.salary > salary[0] && job.salary < salary[1])) {
                return displayJobs(job, idx)
            }
        } else if(jobtype === '') {
            if(job.duration < duration && (job.salary > salary[0] && job.salary < salary[1])){
                return displayJobs(job, idx)
            }
        } else {
            if(jobtype === job.jobtype && job.duration === duration && (job.salary > salary[0] && job.salary < salary[1])) {
                return displayJobs(job, idx)
            }
        }
    }

    const nor = () => {
        return (
            <div className='row container'>
                <form className='col s12'>
                    <div className='row center'>
                        {jobs.map((job, idx) => (
                            <div className='job'>
                                {limitJobs(job, idx)}
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
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

    const slideStyles = makeStyles({
        root: {
            width: 300
        }
    })

    const handleChange = (e, newVal) => {
        setSalary(newVal)
    }

    const valuetext = val => {
        return `$${val}`
    }

    const printSort = () => {
        console.log('printSort')
        if(sortSal) {
            setJobs([...jobs.sort((a, b) => (a.salary > b.salary ? 1 : -1))])
        } else if(!sortSal) {
            setJobs([...jobs.sort((a, b) => (a.salary < b.salary ? 1 : -1))])
        }

        if(sortDur) {
            setJobs([...jobs.sort((a, b) => (a.duration > b.duration ? 1 : -1))])
        } else if(!sortDur) {
            setJobs([...jobs.sort((a, b) => (a.duration < b.duration ? 1 : -1))])
        }
    }

    const resetFilter = () => {
        setSalary([0,100])
        setJobtype('')
        setDuration(null)
    }

    const classes = slideStyles()
    const dropDown = formStyles();

    const renderDisplay = () => {
        if (loader) {
            return(
                <div>
                    <Navbar />
                    <div className='container'>
                        <div className='heading center'>
                            <h2><b>Jobs</b></h2>
                        </div>
                        <div className='row'>
                            <hr/>
                            <h4>Filters</h4>
                            <form noValidate onSubmit={e => e.preventDefault()}>
                                <div className='job type'>
                                    <FormControl className={dropDown.formControl}>
                                        <InputLabel id='demo-simple-select-label'>
                                            Job Type
                                        </InputLabel>
                                        <Select 
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            value={jobtype}
                                            onChange={e => setJobtype(e.target.value)}
                                        >
                                            <MenuItem value={'fulltime'}>Full Time</MenuItem>
                                            <MenuItem value={'parttime'}>Part Time</MenuItem>
                                            <MenuItem value={'work from home'}>Work From Home</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='salary' style={{marginTop: '10px', marginLeft: '10px'}}>
                                    <div className={classes.root}>
                                        <Typography id='range-slider' gutterBottom>
                                            Salary Range
                                        </Typography>
                                        <Slider
                                            value={salary}
                                            onChange={handleChange}
                                            valueLabelDisplay='auto'
                                            aria-labelledby='range-slider'
                                            getAriaValueText={valuetext}
                                        />
                                    </div>
                                </div>
                                <div className='job type'>
                                    <FormControl className={dropDown.formControl}>
                                        <InputLabel id='demo-simple-select-label'>
                                            Duration
                                        </InputLabel>
                                        <Select 
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            value={duration}
                                            onChange={e => setDuration(e.target.value)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </form>
                            <div className='row'>
                                <button
                                    style={{marginTop: '20px', marginLeft: '10px'}}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    onClick={() => resetFilter()}
                                    >
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <hr />
                            <h4>Sort By</h4>
                            <p>Preference is given to Duration</p>
                            <form noValidate onSubmit={e => e.preventDefault()}>
                                <div className='row'>
                                    <div className='sort salary'>
                                        <FormControl className={dropDown.formControl}>
                                            <InputLabel id='demo-simple-select-label'>
                                                Salary
                                            </InputLabel>
                                            <Select 
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                value={sortSal}
                                                onChange={e => setSortSal(e.target.value)}
                                            >
                                                <MenuItem value={true}>Ascending</MenuItem>
                                                <MenuItem value={false}>Descending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='sort duration'>
                                        <FormControl className={dropDown.formControl}>
                                            <InputLabel id='demo-simple-select-label'>
                                                Duration
                                            </InputLabel>
                                            <Select 
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                value={sortDur}
                                                onChange={e => setSortDur(e.target.value)}
                                            >
                                                <MenuItem value={true}>Ascending</MenuItem>
                                                <MenuItem value={false}>Descending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </form>
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
                        < hr/>
                        {nor()}
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
            </div>
        </div>
    )
}

export default AViewJob