import mongoose from "mongoose";
// writing down the basic schema here
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
    // userResponses: [
    //   {
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    //     answerText: { type: String, required: true},
    //   },
    // ],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", question);
