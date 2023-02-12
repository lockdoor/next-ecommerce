import { create } from "@/database/product";
import isAdmin from "@/middleware/isAdmin"
import readForm from "@/middleware/readForm";

function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: `method ${req.method} not allow` });
  create(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default isAdmin(readForm(handler))
