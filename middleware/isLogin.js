import { getToken } from "next-auth/jwt";
import connectDB from "@/database/connectDB";
import User from "@/models/user";

export default function isLogin(handler) {
  return async(req, res) => {
    const token = await getToken({ req });
    if (!token) return res.json({ error: "please log in to get access." });
    // console.log(token)
    try {
      await connectDB();
      const user = await User.findById(token._id);
      if (!user) return res.json({ error: "user not found" });
      req.userId = user._id
      return handler(req, res);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }  
}
