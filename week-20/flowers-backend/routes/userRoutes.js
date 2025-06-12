import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js"

// To use router from Express you initalise it like this. (not mandatory to use router from express)
const router = express.Router();


// To register a new user
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync()

    const user = new User({ email, password: bcrypt.hashSync(password, salt) })
    await user.save()

    res.status(200).json({
      success: true,
      message: "User created successfully",
      response: {
        id: user._id,
        accessToken: user.accessToken
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      response: error
    })
  }
})

// To log in an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        message: "Login successful",
        id: user.id,
        accessToken: user.accessToken,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

export default router;