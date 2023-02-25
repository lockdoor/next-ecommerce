import { listByUserId } from "@/database/cart";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  listByUserId(req, res)
}