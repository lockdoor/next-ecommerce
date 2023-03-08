import { listByUserId } from "@/database/cart";
import isLogin from "@/middleware/isLogin";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  isLogin(listByUserId)(req, res)
}