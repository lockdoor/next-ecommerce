import { create, list, remove, update } from "@/database/address";
import isLogin from "@/middleware/isLogin";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      isLogin(create)(req, res);
      break;
    case "GET":
      isLogin(list)(req, res);
      break;
    case "DELETE":
      isLogin(remove)(req, res);
      break;
    case "PUT":
      isLogin(update)(req, res);
      break;
    default:
      res.status(405).json({ error: `method ${req.method} not allow` });
      break;
  }
}
