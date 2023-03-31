import { register , verifyRegister } from "@/database/user";

export default async function handler(req, res) {
  switch(req.method){
    case 'POST' : 
      register(req, res)
      break
    case 'GET' :
      verifyRegister(req, res)
      break
    default:
      return res.json({ error: `${req.method} not allow` });
  }  
}
