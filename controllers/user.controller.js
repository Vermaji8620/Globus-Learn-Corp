import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const findalreadyavailable = await User.findOne({ email });

    if (findalreadyavailable) {
      console.log(findalreadyavailable);
      res.status(401).json({
        message: "User already exists",
      });
      return;
    }

    const salting = await bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(password, salting);

    try {
      const user = await User.create({
        ...req.body,
        password: hashpassword,
      });
      res.status(200).json({
        message: "user created successfully",
        user: user,
      });
    } catch (err) {
      console.log(" erris ", err.message);
      res.status(403).json({
        message: "User not created",
        error: err.message,
      });
    }
    return;
  } catch (error) {
    res.status(500).json({
      message: "something has gone wrong",
      error: error,
    });
  }
};
