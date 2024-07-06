import { Answer } from "../models/answer.model.js";
import { Question } from "../models/question.model.js";
import { User } from "../models/user.model.js";

export const createanswers = async (req, res) => {
  try {
    const text = req.body.text;
    const questionId = req.body.questionId;
    const userId = req.body.userId;
    if (!text || !questionId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const checkvalidquestion = await Question.findOne({ _id: questionId });
    const checkvaliduser = await User.findOne({ _id: userId });
    if (!checkvalidquestion || !checkvaliduser) {
      return res.status(400).json({
        message: "Invalid question or user",
      });
    }
    const answer = new Answer({
      text: req.body.text,
      questionId: req.body.questionId,
      userId: req.body.userId,
    });
    await answer.save();
    res.status(201).json({ answer, message: "Submission Successfull" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
