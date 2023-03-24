import { list } from "@/database/order";
import isAdmin from "@/middleware/isAdmin";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  isAdmin(list)(req, res)
}