import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

// In this function, I am validating the user input fields as its very easy to bypass the frontend (for signup)
export const userValidationRulesSignUp = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    // Password must be at least of 5 length
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("name").not().isEmpty().withMessage("Name cannot be empty"),
  ];
};

// In this function, I am validating the user input fields as its very easy to bypass the frontend (for signin)
export const userValidationRulesSignIn = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    // Password must be at least of 5 length
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
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
      let user = await User.create({
        ...req.body,
        password: hashpassword,
      });

      const token = jwt.sign({ findmail_id: user._id }, process.env.SIGNATURE);
      // here i will restrict the cookie to the server side only and not to the client side, so i am using httponly: true
      user = { ...user._doc, password: undefined };
      res.cookie("token", token, { httpOnly: true }).status(200).json({
        user,
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

export const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email || !req.body.password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }
    let findmail = await User.findOne({ email });
    if (!findmail) {
      return res.status(401).json({
        message: "Invalid login credentials",
      });
    }
    const dbpassword = findmail.password;
    const password = req.body.password;
    const hashpasswordchck = bcrypt.compareSync(password, dbpassword);
    if (!hashpasswordchck) {
      return res.status(403).json({
        message: "Invalid login credentials",
      });
    }

    const token = jwt.sign(
      { findmail_id: findmail._id },
      process.env.SIGNATURE
    );

    findmail = { ...findmail._doc, password: undefined };

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      user: findmail,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(403).json({
      message: "something went wrong in logging in",
      error: error.message,
    });
  }
};

// now do the user verification and logout functions

export const userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "You are not logged in",
      });
      return;
    }

    const verifytoken = jwt.verify(token, process.env.SIGNATURE);
    if (!verifytoken) {
      return res.status(403).json({
        message: "You are not logged in",
      });
    }

    req.currentUserLoggedIn = verifytoken;
    next();
  } catch (err) {
    res.status(500).json({
      message: "Some error occured",
      error: err.message,
    });
  }
};

// for the deriving of the user details for the user whos logged in
export const userDetails = async (req, res) => {
  const _id = req.params.id;
  try {
    const searchById = req.currentUserLoggedIn.findmail_id === _id;
    if (!searchById) {
      res.status(401).json({
        message: "You can just fetch your own details",
      });
      return;
    }
    let fetchDatabase = await User.findOne({ _id });
    fetchDatabase = { ...fetchDatabase._doc, password: undefined };
    res.status(200).json({
      message: "User is found",
      user: fetchDatabase,
    });
  } catch (error) {
    res.status(500).json({
      message: "there got thrown in catch",
      error: error.message,
    });
  }
};

// for logging out, we will clear the cookie...just this much to do
export const logout = async (req, res) => {
  try {
    const idtobeloggedout = req.params.id;
    if (idtobeloggedout !== req.currentUserLoggedIn.findmail_id) {
      return res.status(403).json({
        message: "Logout Failed",
      });
    }
    res.clearCookie("token").status(200).json({
      message: "user logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Logout error",
      error: err.message,
    });
  }
};
