import express from "express";
import { signUp } from "../controllers/user.controller.js";
import { userValidationRules } from "../controllers/user.controller.js";
import { validate } from "../controllers/user.controller.js";

const router = express.Router();

// all the routing are present over here
router.post("/signup", userValidationRules(), validate, signUp);

export default router;