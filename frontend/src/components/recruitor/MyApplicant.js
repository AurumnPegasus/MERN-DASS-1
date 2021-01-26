import React, { useContext, useState, useEffect } from 'react'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    makeStyles,
} from '@material-ui/core'


const MyApplicant = () => {

    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [apps, setApps] = useState(null)
    const [sortTitle, setSortTitle] = useState(null)
    const [sortApply, setSortApply] = useState(null)
    const [sortName, setSortName] = useState(null)
    
    useEffect(() => {
        async function getStuff(){
            if(loader) return
            if(store.user !== undefined) {
                try {
                    const res = await axios.post('http://localhost:5000/users/applicant', {
                        email: store.user.email
                    })
                    if(res.status===200){
                        console.log(res.data.apps)
                        setApps(res.data.apps)
                        setLoader(true)
                    } else {
                        console.log(res.data.someError)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }   

        getStuff()
    })

    const displayApps = (app, idx) => {
        try {
            return(
                <div>
                    <hr></hr>
                    <p>
                        <b> Applicant Name: </b> {app.name}
                    </p>
                    <p>
                        <b> Job Title: </b>{app.title}
                    </p>
                    <p>
                        <b> Job Type: </b>{app.jobtype}
                    </p>
                    <p>
                        <b>Date of Joining: </b>{app.join}
                    </p>
                </div>
            )
        } catch(err) {
            console.log(err.message)
        }
    }

    const printSort = () => {
        console.log(sortApply)
        console.log(sortTitle)
        console.log(sortName)
        if(sortTitle === true) {
            setApps([...apps.sort((a,b) => a.title > b.title ? 1: -1)])
        } else if (sortTitle === false) {
            setApps([...apps.sort((a,b) => a.title < b.title ? 1: -1)])
        }

        if(sortName === true) {
            setApps([...apps.sort((a,b) => a.name > b.name ? 1: -1)])
        } else if (sortName === false) {
            setApps([...apps.sort((a,b) => a.name < b.name ? 1: -1)])
        }

        if(sortApply === true) {
            setApps([...apps.sort((a, b) => (Date.parse(a.join) > Date.parse(b.join))? 1: -1 )])
        } else if (sortApply === false){
            setApps([...apps.sort((a, b) => (Date.parse(a.join) < Date.parse(b.join))? 1: -1 )])
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

    const renderDisplay = () => {
        if(loader){
            return(
                <div>
                    <div className='header center'>
                        <h3><b>My Applicants</b></h3>            
                    </div>
                    <div className='row'>
                        <div className='sort title'>
                            <FormControl className={dropDown.formControl}>
                                <InputLabel id='demo-simple-select-label'>
                                    Title
                                </InputLabel>
                                <Select 
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={sortTitle}
                                        onChange={e => setSortTitle(e.target.value)}
                                    >
                                        <MenuItem value={true}>Ascending</MenuItem>
                                        <MenuItem value={false}>Descending</MenuItem>
                                        <MenuItem value={null}>No Preference</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={dropDown.formControl}>
                                <InputLabel id='demo-simple-select-label'>
                                    Name
                                </InputLabel>
                                <Select 
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={sortName}
                                        onChange={e => setSortName(e.target.value)}
                                    >
                                        <MenuItem value={true}>Ascending</MenuItem>
                                        <MenuItem value={false}>Descending</MenuItem>
                                        <MenuItem value={null}>No Preference</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={dropDown.formControl}>
                                <InputLabel id='demo-simple-select-label'>
                                    Date of Joining
                                </InputLabel>
                                <Select 
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={sortApply}
                                        onChange={e => setSortApply(e.target.value)}
                                    >
                                        <MenuItem value={true}>Ascending</MenuItem>
                                        <MenuItem value={false}>Descending</MenuItem>
                                        <MenuItem value={null}>No Preference</MenuItem>
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
                    <div className='row container'>
                        <form className='col s12'>
                            <div className='row center'>
                                {apps.map((app, idx) => (
                                    <div className='app'>
                                        {displayApps(app, idx)}
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <Navbar />
            {renderDisplay()}
        </div>
    )
}

export default MyApplicant