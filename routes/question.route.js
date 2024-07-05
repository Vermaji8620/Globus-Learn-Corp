import express from "express";
const router = express.Router();
import {
  createQuestion,
  getQuestions,
} from "../controllers/question.controller.js";
import { userVerification } from "../controllers/user.controller.js";

router.post("/createquestion", userVerification, createQuestion);
router.get("/getquestions/:courseId", userVerification, getQuestions);

export default router;
