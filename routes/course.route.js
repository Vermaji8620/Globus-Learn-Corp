import express from "express";
import {
  createCourse,
  getCourse,
  getspecificCourse,
  validateCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.post("/createcourse", validateCourse, createCourse);
router.get("/getcourse", getCourse);
router.get("/getcourse/:id", getspecificCourse);

export default router;
