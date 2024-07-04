import express from "express";
import {
  signUp,
  userValidationRulesSignIn,
  signIn,
  userValidationRulesSignUp,
  validate,
  userVerification,
  userDetails,
  logout,
} from "../controllers/user.controller.js";

const router = express.Router();

// all the routing are present over here
router.post("/signup", userValidationRulesSignUp(), validate, signUp);
router.post("/signin", userValidationRulesSignIn(), validate, signIn);
router.get("/:id", userVerification, userDetails);
router.post("/:id", userVerification, logout);
export default router;
