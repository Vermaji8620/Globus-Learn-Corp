import { Course } from "../models/course.model.js";
import { Question } from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { text, courseId } = req.body;

    if (!text || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const courseIdtobefound = await Course.findById(courseId);
    if (!courseIdtobefound) {
      return res.status(400).json({ message: "Course not found" });
    }

    const question = new Question({
      text,
      courseId,
    });

    await question.save();

    const coursee = await Course.findByIdAndUpdate(
      courseId,
      { $push: { questions: question._id } },
      { new: true }
    );

    await coursee.save();

    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
