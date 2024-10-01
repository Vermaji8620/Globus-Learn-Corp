import { Course } from "../models/course.model.js";
import { body, validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { Question } from "../models/question.model.js";

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
      questions: [],
      creatorOfCourse: req.currentUserLoggedIn.findmail_id,
    });

    await course.save();

    await User.findByIdAndUpdate(
      { _id: req.currentUserLoggedIn.findmail_id },
      {
        $push: {
          myCourses: course._id,
        },
      },
      { new: true }
    );

    res.status(201).json({ course, message: "Course created successfully" });
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
};

export const getspecificCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      message: "No such course found",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const idtoupdate = req.params.id;
    const course = await Course.findOne({ _id: idtoupdate });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const datatoUpdate = req.body;
    const courseUpdating = await Course.findByIdAndUpdate(
      idtoupdate,
      datatoUpdate,
      { new: true }
    );
    courseUpdating.save();
    res.status(200).json({
      courseUpdated: courseUpdating,
      message: "Course updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "No such course found",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const idtodelete = req.params.id;
    const course = await Course.findOne({ _id: idtodelete });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.questions.forEach(async (qstn) => {
      await Question.findByIdAndDelete(qstn);
    });

    await Course.findByIdAndDelete(idtodelete);

    const deltedCourseInUser = await User.findByIdAndUpdate(
      {
        _id: req.currentUserLoggedIn.findmail_id,
      },
      {
        $pull: {
          myCourses: idtodelete,
        },
      },
      {
        new: true,
      }
    );

    await deltedCourseInUser.save();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "No such course found",
    });
  }
};
