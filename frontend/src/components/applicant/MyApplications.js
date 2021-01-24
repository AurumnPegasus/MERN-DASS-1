import React, { useState, useContext, useEffect } from 'react'
import Context from '../../Context'
import Navbar from './Navbar'
import axios from 'axios'

const MyApplications = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [apps, setApps] = useState(null)

    useEffect(() => {
        async function getApplications() {
            if (loader) return
            if (store.user !== undefined) {
                const res = await axios.post('http://localhost:3000/users/myapps', {
                    email: store.user.email
                })
                console.log(res)
                if (res.status === 200) {
                    console.log(res.data.apps)
                    setApps(res.data.apps)
                    setLoader(true)
                } else {
                    console.log(res.data.someError)
                }
            }
        }

        getApplications()
    })

    const printApp = (app, idx) => {
        try {
            return (
                <div>
                    <hr />
                    <p>
                        <b>{`Title: `}</b> {app.title}
                    </p>
                    <p>
                        <b>Provider Name </b> {app.name}
                    </p>
                    <p>
                        <b>{`Provider Email: `}</b>{app.email}
                    </p>
                    <p>
                        <b>Salary </b>{app.salary}
                    </p>
                    <p>
                        <b>{`Status: `}</b>{app.status}
                    </p>
                    
                </div>
            )
        } catch (err) {
            console.log(err.message)
        }
    }

    const renderDisplay = () => {
        if(loader) {
            return(
                <div>
                    <div className='container'>
                        <div className='center'>
                            <h2>My Applications</h2>
                        </div>
                        <div className='row'>
                            <hr />
                            <form className='col s12'>
                                {apps.map((app, idx) => (
                                    <div className='app'>
                                        {printApp(app, idx)}
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <Navbar/>
            {renderDisplay()}
        </div>
    )
}

export default MyApplications