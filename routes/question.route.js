import express from "express";
const router = express.Router();
import { createQuestion, getQuestions } from "../controllers/question.controller.js";

router.post("/createquestion", createQuestion);
router.get("/getquestions/:courseId", getQuestions);

export default router;