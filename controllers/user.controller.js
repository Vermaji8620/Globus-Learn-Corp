import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

// In this function, I am validating the user input fields as its very easy to bypass the frontend
export const userValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    // Password must be at least of 5 length
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("name").not().isEmpty().withMessage("Name cannot be empty"),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// In this function, I am checking if the user is already available in the database or not
export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({
        message: "All fields are required",
      });

    const findalreadyavailable = await User.findOne({ email });

    if (findalreadyavailable) {
      res.status(401).json({
        message: "User already exists",
      });
      return;
    }

    const salting = await bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(password, salting);

    try {
      const user = await User.create({
        ...req.body,
        password: hashpassword,
      });

      const token = jwt.sign({ findmail_id: user._id }, process.env.SIGNATURE);
      // here i will restrict the cookie to the server side only and not to the client side, so i am using httponly: true
      res.cookie("token", token, { httpOnly: true }).status(200).json({
        message: "user created successfully",
      });
    } catch (err) {
      res.status(403).json({
        message: "User not created",
        error: err.message,
      });
    }
    return;
  } catch (error) {
    res.status(500).json({
      message: "something has gone wrong",
      error: error,
    });
  }
};

