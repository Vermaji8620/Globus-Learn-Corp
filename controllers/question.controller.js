import { Course } from "../models/course.model.js";
import { Question } from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { text } = req.body;
    const courseId = req.params.course_id;

    if (!text || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const courseIdtobefound = await Course.findById(courseId);
    if (!courseIdtobefound) {
      return res.status(400).json({ message: "Course not found" });
    }

    if (
      courseIdtobefound.creatorOfCourse != req.currentUserLoggedIn.findmail_id
    ) {
      return res.status(401).json({
        message: "Can only create question for your own course",
      });
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

export const getQuestions = async (req, res) => {
  try {
    const course = req.params.courseId;
    let getqstns = await Course.findById(course).populate("questions");
    if (!getqstns) {
      return res.status(400).json({ message: "Course not found" });
    }

    if (getqstns.creatorOfCourse != req.currentUserLoggedIn.findmail_id) {
      res.status(401).json({
        message: "You can just get your list of questions",
      });
    }

    res.status(200).json(getqstns.questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuestions = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const getQuestion = await Question.findById(questionId);
    if (!getQuestion) {
      return res.status(401).json({
        message: "Question not found",
      });
    }

    const getCourseforQuestion = getQuestion.courseId;
    await Question.findByIdAndDelete(questionId);

    const deltefromCourse = await Course.findOneAndUpdate(
      {
        _id: getCourseforQuestion,
      },
      {
        $pull: {
          questions: questionId,
        },
      },
      {
        new: true,
      }
    );

    await deltefromCourse.save();

    res.status(201).json({ message: "question deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
