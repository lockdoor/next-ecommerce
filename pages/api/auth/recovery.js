import { recovery, verifyRecovery } from "@/database/user"

export default function handler(req, res){
  switch(req.method){
    case 'POST': 
      recovery(req, res)
      break
    case 'PUT': 
      verifyRecovery(req, res)
      break
    default:
      res.json({error: `${req.method} not allow`})
      break
  }
}