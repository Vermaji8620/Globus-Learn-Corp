import { Course } from "../models/course.model.js";
import { body, validationResult } from "express-validator";

// Middleware for course validation
export const validateCourse = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Invalid Name"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Invalid Description"),
  body("teacher")
    .notEmpty()
    .withMessage("Teacher is required")
    .isString()
    .withMessage("Invalid Teacher"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("durationInHours")
    .notEmpty()
    .withMessage("Duration in hours is required")
    .isNumeric()
    .withMessage("Duration in hours must be a number")
    .isFloat({ min: 1 })
    .withMessage("Course should be atleast 1 hour long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const createCourse = async (req, res) => {
  try {
    const { name, description, teacher, price, rating, durationInHours } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !rating ||
      !teacher ||
      !durationInHours
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = new Course({
      name,
      description,
      price,
      rating,
      teacher,
      durationInHours,
    });

    await course.save();

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}