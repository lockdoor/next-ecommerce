import isLogin from "@/middleware/isLogin";
import {updateMain} from "@/database/address"
export default function handler(req, res){

  if(req.method !== 'PUT'){
    return res.status(405).json({ error: `method ${req.method} not allow` });
  }else{
    isLogin(updateMain)(req, res)
  }
  
}