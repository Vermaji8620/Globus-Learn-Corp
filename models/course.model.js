import mongoose from "mongoose";
// writing down the basic schema here
const course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    durationInHours: {
      type: Number,
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    // userResponses: [
    //   {
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     answers: [
    //       {
    //         questionId: {
    //           type: mongoose.Schema.Types.ObjectId,
    //           ref: "Question",
    //           required: true,
    //         },
    //         answerText: { type: String, required: true },
    //       },
    //     ],
    //   },
    // ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", course);
