import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validUserName = await User.findOne({ username });
    if (!validUserName) return next(new Error("User does not exist"));
    const validPassword = bcrypt.compareSync(password, validUserName.password);
    if (!validPassword) return next(new Error("Wrong credentials"));
    const token = jwt.sign({ id: validUserName._id }, process.env.JWT_KEY);
    const { password: pass, ...user } = validUserName._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(user);
  } catch (error) {
    next(error);
  }
};


export const googleAuth = async (req, res, next) => {

try {
const user=await User.findOne({email: req.body.email});
if(user){
const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
const { password: pass, ...user } = user._doc;
res.cookie("token", token, { httpOnly: true }).status(200).json(user);
}else{
const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
const hashPassword = await bcrypt.hashSync(generatedPassword, 10);
const newUser = new User({ username: req.body.name.split(" ").join("").toLocaleLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashPassword, avatar: req.body.photo});
await newUser.save();
const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
const { password: pass, ...user } = newUser._doc;
res.cookie("token", token, { httpOnly: true }).status(201).json(user);
}
} catch (error) {
next(error);
}
};