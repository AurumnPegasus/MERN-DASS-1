// Importing required frameworks/libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Importing files
import validateRegister from "../../validation/register.js";
import validateLogin from "../../validation/login.js";
import User from "../../models/User.js";
import Job from '../../models/Job.js'
import Application from '../../models/Application.js'
import images from "../../config/default.js";

// Initialisation
dotenv.config();
const keys = process.env;

export const example = (req, res) => {
  return res.send("Hello");
};

export const registerUser = async (req, res) => {
  try {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
      return res.status(201).json(errors);
    }
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const profile = req.body.profile.length === 0 ? images : req.body.profile;
    const isApplicant = req.body.isApplicant;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(201).json({ email: "Email is already registered" });
    }
    const newUser = new User({
      name,
      isApplicant,
      email,
      pass,
      profile,
    });

    bcrypt.hash(newUser.pass, 10, (err, hash) => {
      if (err) throw err;
      newUser.pass = hash;
      newUser
        .save()
        .then((user) => res.send(user))
        .catch((err) => res.status(201).json({ someError: err.message }));
    });
  } catch (error) {
    return res.status(201).json({ someError: error.message });
  }
};

export const loginUser = async (req, res) => {
  // console.log('idk how I got her')
  try {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
      return res.status(201).json(errors);
    }

    const email = req.body.email;
    const pass = req.body.pass;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(201).json({ email: "Email not found" });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(201).json({ pass: "Password is incorrect" });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, keys.secretOrKey);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(201).json({ someError: error.message });
  }
};

export const profileUser = async(req, res) => {
  try {
    const token = req.body.token
    const info = jwt.verify(token, keys.secretOrKey)
    const user = await User.findOne({_id: info.id})
    return res.status(200).json({ user })
  } catch(err) {
    console.log(err.message)
    return res.status(201).json({ someError: err.message })
  }
}

export const editprofileUser = async(req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.pass
    const isApplicant = req.body.isApplicant
    const profile = req.body.profile.length === 0 ? images : req.body.profile;
    let education = req.body.education
    const skills = req.body.skills
    for(let edu of education){
      if (!(!isNaN(edu.join) && edu.join.length===4)){
        edu.join = ''
      }
      if(edu.leave.length === 0){
        edu.leave = 'Ongoing'
      } else if(!(!isNaN(edu.leave) && edu.leave.length===4)){
        edu.leave = ''
      }
    }

    const user = {
      name,
      email,
      pass,
      isApplicant,
      profile,
      education,
      skills
    }

    const updateRes = await User.updateOne({ email: email }, {
      name,
      email,
      pass,
      isApplicant,
      profile,
      education,
      skills
    })
    console.log('Updated')
    return res.status(200).json({ user })
  } catch (err) {
    console.log(err)
    return res.status(201).json({ someError: err })
  }
}

export const reditprofileUser = async(req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.pass
    const isApplicant = req.body.isApplicant
    const profile = req.body.profile
    const contact = req.body.contact
    const bio = req.body.bio

    if (!(contact.length === 9 && !isNaN(contact))){
      return res.status(201).json({ contact: 'Invalid contact number provided '})
    } 
    if (bio.split(' ').length + 1 > 250){
      return res.status(201).json({ bio: 'Exceeded number of words '})
    }

    const user = {
      name,
      email,
      pass,
      isApplicant,
      profile,
      contact,
      bio
    }

    const updateRes = await User.updateOne({ email: email }, {
      name,
      email,
      pass,
      isApplicant,
      profile,
      contact,
      bio
    })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(201).json({ someError: err })
  }
}

export const apply = async (req, res) => {
  try {
    const title = req.body.title
    const email = req.body.email
    const myEmail = req.body.myEmail
    const status = req.body.status
    const sop = req.body.sop
    const application = await Application.findOne({ title, email })
    const appNo = await Application.find({ myEmail })
    console.log(appNo.length)
    if (application) {
      return res.status(201).json({ someError: 'Already Applied here bud' })
    } else if (sop.split(' ').length + 1 > 250 || sop.length===0) {
      return res.status(201).json({ sop: 'Invalid length of SOP, must be between 1 and 250 words'})
    } else if(appNo.length > 10) {
      return res.status(201).json({ someError: 'Limit is 10 Applications at a time '})
    }
    const newApplication = new Application({
      title, 
      email,
      myEmail,
      status, 
      sop
    })

    newApplication.save()
        .then(application => res.status(200).json({application}))
        .catch(err => res.status(201).json({ someError: err.message }))
  } catch(err) {
    return res.status(201).json({ someError: err.message })
  }
}

export const myApps = async (req, res) => {
  try{
    let returnObj = []
    const appsList = await Application.find({myEmail: req.body.email})
    for(let i in appsList){
      const response = await Job.find({ title: appsList[i].title })
      returnObj.push({
        title: appsList[i].title,
        email: appsList[i].email,
        status: appsList[i].status,
        name: response[0].name,
        salary: response[0].salary
      })
    }
    return res.status(200).json({ apps: returnObj })
  } catch(err) {
    return res.status(201).json({someError: err.message})
  }
}

export const rmyApps = async (req, res) => {
  try {
    let returnObj = []
    const appsList = await Application.find({ title: req.body.title })
    for(let i in appsList) {
      const response = await User.findOne({ email: appsList[i].myEmail })
      if(appsList[i].status === 'reject') {
        continue;
      }
      returnObj.push({
        title: appsList[i].title,
        name: response.name,
        skills: response.skills,
        sop: appsList[i].sop,
        status: appsList[i].status,
        education: response.education
      })
    }
    console.log(req.body.title)
    return res.status(200).json({ apps: returnObj })
  } catch (err) {
    return res.status(201).json({ someError: err.message })
  }
}

export const status = async (req, res) => {
  try {
    const title = req.body.title
    const email = req.body.email
    console.log(title)
    console.log(email)
    const status = req.body.status
    const response = await Application.findOne({ title, email })
    const application = {
      title,
      email,
      myEmail: response.myEmail,
      status,
      sop: response.sop
    }

    const updateRes = await Application.updateOne({email, title}, {
      title,
      email,
      myEmail: response.myEmail,
      status,
      sop: response.sop 
    })

    return res.status(200).json({ application })

  } catch (err) {
    return res.status(201).json({ someError: err })
  }
}

export const applicant = async (req, res) => {
  try {
    const email = req.body.email
    const response = await Application.find({ email, status: 'accept'})
    const responseObj = []
    for(let i in response){
      const myEmail = response[i].myEmail
      const title = response[i].title
      const user = await User.findOne({ email: myEmail })
      const name = user.name
      const job = await Job.findOne({ title })
      const jobtype = job.jobtype
      responseObj.push({
        name,
        jobtype,
        title
      })
    }
    return res.status(200).json({ apps: responseObj })
  } catch (err) {
    return res.status(201).json({ someError: err.message })
  }
}