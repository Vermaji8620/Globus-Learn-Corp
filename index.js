import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import questionRoute from "./routes/question.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`This is a testing URL`);
});

app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/question", questionRoute);

// the below one is for the global catch
app.use((err, req, res, next) => {
  res.status(500).json({
    message: `Error caught in global catch`,
    error: err.message,
  });
});

// below i have made the async function for the connection to the mongodb database and then listening to the port

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://vadityaraj67:${process.env.MONGODB_CLUSTER}@cluster0.yvftnur.mongodb.net/Globus-Learn-Corp`
    );

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Your server is up and running at port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
