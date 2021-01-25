import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'
import Fuse from 'fuse.js'
import {Form} from 'react-bootstrap'
import classnames from 'classnames'
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
    const [backup, setBackup] = useState(null)
    const [jobtype, setJobtype] = useState('')
    const [salary, setSalary] = useState([0, 100])
    const [duration, setDuration] = useState(null)
    const [sortSal, setSortSal] = useState(null)
    const [sortDur, setSortDur] = useState(null)
    const [query, setQuery] = useState('')
    const [apply, setApply] = useState(false)
    const [ajob, setAjob] = useState(null)
    const [sop, setSop] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function timepass() {
            if(loader) return
            if (store.user !== undefined) {
                const jobList = await axios.get('http://localhost:3000/jobs/viewjob')
                setJobs(jobList.data.jobs)
                setBackup(jobList.data.jobs)
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
                    <button
                        style={{marginTop: '20px', marginLeft: '10px'}}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        onClick={() => makeApplication(job)}
                        >
                        Apply
                    </button>
                </div>
            )
        } catch (err) {
            console.log(err)
        }
    }

    const makeApplication = (job) => {
        setApply(true)
        setAjob(job)
        setErrors({})
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
    
    const onSearch = currentTarget => {
        const fuse = new Fuse(backup, {
            keys: [
                'title',
            ]
        })
        setQuery(currentTarget)
        if(query !== '')
        {
            console.log(fuse.search(query).map(item => item.item))
            setJobs([...fuse.search(query).map(item => item.item)])
        } else {
            setJobs(backup)
        }
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
                        <div className='row'>
                            < hr />
                            <form noValidate onSubmit={e => e.preventDefault()}>
                                <div className='input-field col s12'>
                                    <input 
                                        id='fuzzy'
                                        type='text'
                                        value={query}
                                        onChange={e => onSearch(e.target.value)}
                                    />
                                    <label htmlFor='fuzzy'>Search</label>
                                </div>
                            </form>
                        </div>
                        {nor()}
                    </div>
                </div>
            )
        }
    }

    const submitMe = async () => {
        try {   
            console.log('here')
            let res = await axios.post('http://localhost:5000/users/apply', {
                title: ajob.title,
                myEmail: store.user.email,
                email: ajob.email,
                status: 'Waiting',
                sop
            })
            console.log(res)
            if(res.status === 200){
                console.log('Success')
                setApply(false)
                setErrors({})
                setSop('')
            } else if (res.data.sop){
                setErrors({ sop: res.data.sop})
            }else {
                setErrors({ someError: res.data.someError })
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    const renderApplication = () => {
        if(loader) {
            return(
                <div className='container'>
                    <div className='center'>
                        <h2>Apply for Job</h2>
                        <hr />
                    </div>
                    <Form>
                        <Form.Group controid='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type='text'
                                plaintext
                                defaultValue={ajob.title}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type='text'
                                plaintext
                                defaultValue={ajob.name}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type='email'
                                plaintext
                                defaultValue={ajob.email}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='applicants'>
                            <Form.Label>Max number of Applicants</Form.Label>
                            <Form.Control 
                                type='number'
                                plaintext
                                defaultValue={ajob.applicants}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='positions'>
                            <Form.Label>Max number of Positons</Form.Label>
                            <Form.Control 
                                type='number'
                                plaintext
                                defaultValue={ajob.positions}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlid='skills'>
                            <Form.Label>Skills</Form.Label>
                            {ajob.skills.map((skill, idx) => (
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
                                defaultValue={ajob.jobtype}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='months'>
                            <Form.Label>Duration of Job</Form.Label>
                            <Form.Control 
                                type='number'
                                plaintext
                                defaultValue={ajob.duration}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='salary'>
                            <Form.Label>Salary of Job</Form.Label>
                            <Form.Control 
                                type='number'
                                plaintext
                                defaultValue={ajob.salary}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controid='sop'>
                            <Form.Label>Statement of Purpose</Form.Label>
                            <Form.Control 
                                type='text'
                                plaintext
                                defaultValue={sop}
                                className={classnames('', {invalid: errors.sop})}
                                onChange={e => setSop(e.target.value)}
                            />
                            <span className='red-text'>{errors.sop}</span>
                        </Form.Group>
                    </Form>
                    <button
                        style={{margin: '10px'}}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        onClick={() => setApply(false)}
                        >
                        Go Back
                    </button>
                    <button
                        style={{margin: '10px'}}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classnames("btn btn-large waves-effect waves-light hoverable blue accent-3", {invalid: errors.someError})}
                        onClick={() => submitMe()}
                        >
                        Submit
                    </button>
                    <span className='red-text'>{errors.someError}</span>
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                {apply? renderApplication() : renderDisplay()}
            </div>
            <div>
            </div>
        </div>
    )
}

export default AViewJob