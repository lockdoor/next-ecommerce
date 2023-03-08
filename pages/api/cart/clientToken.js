import { getToken } from "@/database/payment";
import isLogin from "@/middleware/isLogin";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  isLogin(getToken)(req, res);
}
