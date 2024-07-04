import express from "express";
import {
  createCourse,
  getCourse,
  validateCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.post("/createcourse", validateCourse, createCourse);
router.get("/getcourse", getCourse);

export default router;
