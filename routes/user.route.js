import express from "express";
import {
  signUp,
  userValidationRulesSignIn,
  signIn,
  userValidationRulesSignUp,
  validate,
} from "../controllers/user.controller.js";

const router = express.Router();

// all the routing are present over here
router.post("/signup", userValidationRulesSignUp(), validate, signUp);
router.post("/signin", userValidationRulesSignIn(), validate, signIn);

export default router;
