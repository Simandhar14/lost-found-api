import express, { Router } from "express";
import zod from "zod";
import bcrypt from "bcryptjs";
import { User } from "./../Database/Models/models.js";
import jwt from "jsonwebtoken";
const app = express();

const router = Router();

const signupbody = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

const signinbody = zod.object({
  email: zod.string(),
  password: zod.string(),
});

router.post("/register", async (req, res) => {
  const { success } = signupbody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect input format",
    });
  }

  const existinguser = await User.findOne({
    email: req.body.email,
  });

  if (existinguser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedpassword,
  });

  console.log("User created successfully");
  res.status(200).json({
    message: "User created successfully",
  });

  const userId = user._id;
});

router.post("/login", async (req, res) => {
  try {
    const { success } = signinbody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(411).json({
        message: "User not found , kindly check your credentials",
      });
    }

    const userId = user._id;
    const authpassword = req.body.password;
    const check = await bcrypt.compare(authpassword, user.password);

    if (!check) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
    console.log(err);
  }
});

export default router;
