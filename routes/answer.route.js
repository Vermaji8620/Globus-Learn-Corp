import express from "express";
const router = express.Router();
import { createanswers } from "../controllers/answer.controller.js";
import { userVerification } from "../controllers/user.controller.js";

router.post("/", userVerification, createanswers);

export default router;
