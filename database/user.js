import connectDB from "./connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";
import validator from "validator";

export const changeName = async (req, res) => {
  try {
    const { userId, name } = req.body;
    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: "changeName has error in catch" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    await connectDB();
    const user = await User.findById(userId);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.json({ error: "old password wrong" });
    if (
      !newPassword ||
      !validator.isStrongPassword(newPassword, {
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      return res.json({ error: "password is required" });
    }
    const passwordHass = await bcrypt.hash(newPassword, 8);
    user.password = passwordHass;
    await user.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ error: "changePassword has error in catch" });
  }
};
