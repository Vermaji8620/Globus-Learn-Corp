import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getspecificCourse,
  updateCourse,
  validateCourse,
} from "../controllers/course.controller.js";
import { userVerification } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/createcourse", userVerification, validateCourse, createCourse);
router.get("/getcourse", getCourse);
router.get("/getcourse/:id", userVerification, getspecificCourse);
router.put("/updatecourse/:id", userVerification, updateCourse);
router.delete("/deletecourse/:id", userVerification, deleteCourse);
export default router;
