// Importing required frameworks/libraries
import dotenv from "dotenv";

// Importing files
import User from "../../models/User.js";
import Job from '../../models/Job.js'

// Initialisation
dotenv.config();
const keys = process.env;

export const viewJob = async (req, res) => {
    try {
        const jobs = await Job.find({});
        return res.status(200).json({ jobs })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const rJob = async (req, res) => {
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
        let skillsList = req.body.skills
        const jobtype = req.body.jobtype
        const duration = req.body.duration
        const salary = req.body.salary
        let skillFinal = []

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
        } else if(duration<1 || duration >6){
            return res.status(201).json({ duration: 'Duration must be from 1-6 months'})
        } else if(salary<1){
            return res.status(201).json({ salary: 'Against labour laws :p' })
        } else {
            for(let skill of skillsList){
                if(skill.name.length >0){
                    skillFinal.concat(skill)
                }
            }
        }
        const skills = skillFinal

        const newJob = new Job({
            title, 
            name,
            email,
            applicants,
            positions,
            skills,
            jobtype,
            duration,
            salary
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

        if(applicants <= 0) {
            return res.status(201).json({ applicants: 'Applicants must be >0 '})
        } else if(positions <=0 ) {
            return res.status(201).json({ positions: 'Positions must be >0 '})
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
            salary
        }

        const jobres = await Job.updateOne({ title }, {
            title,
            name,
            email,
            applicants,
            positions,
            skills,
            jobtype,
            duration,
            salary
        })

        console.log('Updated')
        return res.status(200).json( {job} )
    } catch(err) {
        console.log(err.message)
        return res.status(201).json({ someError: err })
    }
}