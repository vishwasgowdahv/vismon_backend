import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateLogin from "../middleware/validateLogin.js";
const { sign, verify } = jwt;

const router = express.Router();

const JWT_SECRET = "YHJFHTDTHGLKDRTDJHKH";

let sucess = false;

//Signup
router.post(
  "/signup",
  [
    body("name", "Name Should be minimm 3 Charecters").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Must be More than 3 Charecters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(404).json({ sucess, error: results.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ sucess, error: "USER Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const authtoken = sign({ id: user.id }, JWT_SECRET);
    sucess = true;
    res.json({ sucess, authtoken });
  }
);

//Login
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Must be More than 3 Charecters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    sucess = false;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(404).json({ sucess, error: results.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ sucess, error: "Enter Valid Credentials" });
    }
    console.log(user.password, password);

    const passwordCheck = await bcrypt.compare(
      password,user.password
    );
    console.log(passwordCheck);
    
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ sucess, error: "Enter Valid password Credentials" });
    }

    const authtoken = sign({ id: user.id }, JWT_SECRET);
    sucess = true;
    res.json({ sucess, authtoken });
  }
);

//fetchUserData
router.post("/fetchuser", validateLogin, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ sucess, user });
});

export default router;
