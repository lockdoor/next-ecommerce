import { list } from "@/database/category";
export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  list(req, res)
}
