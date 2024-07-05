import express from "express";
const router = express.Router();
import { createQuestion } from "../controllers/question.controller.js";

router.post("/createquestion", createQuestion);

export default router;