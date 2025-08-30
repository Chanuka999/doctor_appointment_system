import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3000;

const connectDb = async () => {
  try {
    const MONGOURL = "mongodb://localhost:27017/doctor_db";
    await mongoose.connect(MONGOURL);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("mongodb faild");
  }
};

app.post("/register", async (req, res) => {
  const user = req.body;

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({ success: true, message: "success" });
      } else {
        res.status(401).json({ success: false, message: "password incorrect" });
      }
    } else {
      res.status(404).json({ success: false, message: "server error" });
    }
  });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`server is starting on ${PORT}`);
});
