import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Context from '../../Context'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import classnames from 'classnames'

const DeleteJob = () => {
    const { store } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState('')
    const [back, setBack] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if(loader) return
        if(store.user !== undefined) {
            setLoader(true)
        }
    })

    const goBack = () => {
        if(back) {
            return <Redirect to='/viewjob'></Redirect>
        }
    }

    const deleteMe = async () => {
        try {
            const res = await axios.post('http://localhost:5000/jobs/deletejob', {
                title,
                email: store.user.email
            })
            console.log(res)
            if(res.status === 200) {
                setBack(true)  
                setErrors({})
            } else if(res.data.title) {
                setErrors({ title: res.data.title })
            } else {
                console.log(res.data.someError)
                setErrors({ someError: res.data.someError })
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const acceptInput = () => {
        if(loader) {
            return (
                <div className='container'>
                    <Form>
                        <Form.Group controlid='title'>
                            <Form.Label>Title of Job</Form.Label>
                            <Form.Control 
                                className={classnames('', { invalid: errors.title })}
                                type='text'
                                plaintext
                                defaultValue={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <span className='red-text'>{errors.title}</span>
                    </Form>
                    <button className='btn waves-effect waves-light hoverable blue accent3'
                            onClick={() => setBack(true)}>
                        Go Back
                    </button>
                    <button className='btn waves-effect waves-light hoverable blue accent3'
                            onClick={() => deleteMe()}>
                        Delete
                    </button>
                </div>
            )
        }
    }


    return(
        <div>
            {acceptInput()}
            {goBack()}
        </div>
    )
}

export default DeleteJob