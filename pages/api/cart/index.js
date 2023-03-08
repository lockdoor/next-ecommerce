import { create, removeProductInCart } from "@/database/cart";
import isLogin from "@/middleware/isLogin";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      isLogin(create)(req, res);
      break;
    case "DELETE":
      isLogin(removeProductInCart)(req, res);
      break;
    default:
      return res.status(405).json({ error: `method ${req.method} not allow` });
  }
}
