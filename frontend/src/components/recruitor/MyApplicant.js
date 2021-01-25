import React, { useContext, useState, useEffect } from 'react'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'

const MyApplicant = () => {

    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [apps, setApps] = useState(null)
    
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
                </div>
            )
        } catch(err) {
            console.log(err.message)
        }
    }

    const renderDisplay = () => {
        if(loader){
            return(
                <div>
                    <div className='header center'>
                        <h3><b>View Applicants</b></h3>            
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