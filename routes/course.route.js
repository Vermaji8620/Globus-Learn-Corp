import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getspecificCourse,
  updateCourse,
  validateCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.post("/createcourse", validateCourse, createCourse);
router.get("/getcourse", getCourse);
router.get("/getcourse/:id", getspecificCourse);
router.put("/updatecourse/:id", updateCourse);
router.delete("/deletecourse/:id", deleteCourse);
export default router;
