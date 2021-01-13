// Importing required frameworks/libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Importing files
import validateRegister from "../../validation/register.js";
import validateLogin from "../../validation/login.js";
import User from "../../models/User.js";

// Initialisation
dotenv.config();
const keys = process.env;

export const example = (req, res) => {
  return res.send("Hello");
};

export const registerUser = (req, res) => {
  //  console.log("I am here");
  //  console.log(req.body);
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        isApplicant: req.body.isApplicant,
        email: req.body.email,
        pass: req.body.pass,
      });
      bcrypt.hash(newUser.pass, 10, (err, hash) => {
        if (err) throw err;
        newUser.pass = hash;
        newUser
          .save()
          .then((user) => res.send(user))
          .catch((err) => console.log(err));
      });
    }
  });
};

export const loginUser = async (req, res) => {
  try {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const pass = req.body.pass;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res
        .status(400)
        .json({ passwordIncorrect: "Password is incorrect" });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, keys.secretOrKey);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(404).json({ someError: error.message });
  }
};
