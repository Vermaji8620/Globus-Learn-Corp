import express from "express";
import {
  createCourse,
  validateCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.post("/createcourse", validateCourse, createCourse);

export default router;
