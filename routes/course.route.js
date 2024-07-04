import express from "express";
import {
  createCourse,
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
export default router;
