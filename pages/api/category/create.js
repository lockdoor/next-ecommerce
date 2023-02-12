import { create } from "@/database/category";
import isAdmin from "@/middleware/isAdmin"

function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  create(req, res)
}

export default isAdmin(handler)