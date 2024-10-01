import express from "express";
const router = express.Router();
import {
  createQuestion,
  deleteQuestions,
  getQuestions,
} from "../controllers/question.controller.js";
import { userVerification } from "../controllers/user.controller.js";

router.post("/createquestion/:course_id", userVerification, createQuestion);
router.get("/getquestions/:courseId", userVerification, getQuestions);
router.post("/deletequestion/:questionId", userVerification, deleteQuestions);

export default router;
