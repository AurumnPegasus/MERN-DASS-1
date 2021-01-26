// Importing required frameworks/libraries
import dotenv from "dotenv";
import date from 'date-and-time'

// Importing files
import User from "../../models/User.js";
import Applicants from '../../models/Application.js'
import Job from '../../models/Job.js'

// Initialisation
dotenv.config();
const keys = process.env;

export const viewJob = async (req, res) => {
    try {
        const jobs = await Job.find({});
        const now = new Date()
        const rn = date.format(now, 'DD/MM/YYYY HH:mm')
        const returnObj = []
        for(let i in jobs){
            const dl = jobs[i].deadline
            const today = date.parse(rn, 'DD/MM/YYYY HH:mm')
            const DL = date.parse(dl, 'DD/MM/YYYY HH:mm')
            if (date.subtract(today, DL).toMinutes() < 0) {
                returnObj.push(jobs[i])
            }
        }
        return res.status(200).json({ jobs: returnObj })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const rJob = async (req, res) => {
    try {
        const email = req.body.email
        const jobs = await Job.find({ email })
        const now = new Date()
        const rn = date.format(now, 'DD/MM/YYYY HH:mm')
        const returnObj = []
        for(let i in jobs){
            const dl = jobs[i].deadline
            const today = date.parse(rn, 'DD/MM/YYYY HH:mm')
            const DL = date.parse(dl, 'DD/MM/YYYY HH:mm')
            console.log(date.subtract(today, DL).toMinutes())
            if(date.subtract(today, DL).toMinutes() <= 0) {
                returnObj.push(jobs[i])
            } else {
                continue
            }
        }
        // console.log(returnObj)
        return res.status(200).json({ jobs: returnObj })
    } catch (err) {
        console.log(err.message)
        return res.status(201).json({ someError: err.message })
    }
}

export const rAllJob = async (req, res) => {
    try {
        const email = req.body.email
        const jobs = await Job.find({ email })
        return res.status(200).json({ jobs })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const createJob = async (req, res) => {
    try {
        const title = req.body.title
        const name = req.body.name
        const email = req.body.email
        const applicants = req.body.applicants
        const positions = req.body.positions
        const skills = req.body.skills
        const jobtype = req.body.jobtype
        const duration = req.body.duration
        const salary = req.body.salary
        const now = new Date()
        const post = date.format(now, 'DD/MM/YYYY')
        const deadline = req.body.deadline

        const job = await Job.findOne({ title });
        if (job) {
            return res.status(201).json({ title: 'Job with same Title already exists '})
        }

        if(title.length ===0 ){
            return res.status(201).json({ title: 'No title' })
        } else if(applicants <= 0) {
            return res.status(201).json({ applicants: 'Applicants must be >0 '})
        } else if(positions <=0 ) {
            return res.status(201).json({ positions: 'Positions must be >0 '})
        } else if(!(jobtype === 'fulltime' || jobtype==='parttime' || jobtype==='work from home')) {
            return res.status(201).json({ jobtype: 'invalid' })
        } else if(duration<0 || duration >6){
            return res.status(201).json({ duration: 'Duration must be from 0-6 months'})
        } else if(salary<1){
            return res.status(201).json({ salary: 'Against labour laws :p' })
        } else if (isNaN(date.parse(deadline, 'DD/MM/YYYY HH:mm'))) {
            return res.status(201).json({ deadline: 'Not a valid date' })
        }

        const newJob = new Job({
            title, 
            name,
            email,
            applicants,
            positions,
            skills,
            jobtype,
            duration,
            salary,
            post,
            deadline
        })
        newJob.save()
            .then((job) => res.status(200).json({ job }))
            .catch((err) => res.status(201).json({ someError: err.message}))
    } catch(err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const getJob = async (req, res) => {
    try {   
        const title = req.body.etitle
        const job = await Job.findOne({ title })
        if(job) {
            return res.status(200).json({ job })
        } else {
            return res.status(201).json({ title: 'No Job exists by this title'})
        }
    } catch(err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const editJob = async (req, res) => {
    try {
        const title = req.body.title
        const name = req.body.name
        const email = req.body.email
        const applicants = req.body.applicants
        const positions = req.body.positions
        const skills = req.body.skills
        const jobtype = req.body.jobtype
        const duration = req.body.duration
        const salary = req.body.salary
        const deadline = req.body.deadline
        const post = req.body.post
        console.log(deadline)

        if(applicants <= 0) {
            return res.status(201).json({ applicants: 'Applicants must be >0 '})
        } else if(positions <=0 ) {
            return res.status(201).json({ positions: 'Positions must be >0 '})
        } else if (isNaN(date.parse(deadline, 'DD/MM/YYYY HH:mm'))) {
            return res.status(201).json({ deadline: 'Not a valid date' })
        }

        const job = {
            title,
            name,
            email,
            applicants,
            positions,
            skills,
            jobtype,
            duration,
            salary,
            post,
            deadline
        }

        const jobres = await Job.updateOne({ title, email }, {
            title,
            name,
            email,
            applicants,
            positions,
            skills,
            jobtype,
            duration,
            salary,
            post, 
            deadline
        })

        console.log('Updated')
        return res.status(200).json( {job} )
    } catch(err) {
        console.log(err.message)
        return res.status(201).json({ someError: err })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const title = req.body.title
        const email = req.body.email
        const j = await Job.findOne({title, email})
        if (!j) {
            return res.status(201).json({ title: 'No such title exists'})
        }
        const job = await Job.findOneAndDelete({ title })
        const apps = await Applicants.deleteMany({ title })
        return res.status(200).json({ success: 'Success' })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}