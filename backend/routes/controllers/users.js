// Importing required frameworks/libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Importing files
import validateRegister from "../../validation/register.js";
import validateLogin from "../../validation/login.js";
import User from "../../models/User.js";
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
