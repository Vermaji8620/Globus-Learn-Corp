import mongoose from "mongoose";
const question = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", question);
