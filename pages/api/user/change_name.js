import { changeName } from "@/database/user";
import isLogin from "@/middleware/isLogin";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  isLogin(changeName)(req, res)
}
