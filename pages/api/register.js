import validator from "validator"
import bcrypt from 'bcrypt'
import connectDB from "@/database/connectDB"
import User from "@/models/user"

export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(400).json({error: `${req.method} not allow`})
  }
  const {name, email, password} = req.body
  try{
    if(!name || validator.isEmpty(name)){
      return res.status(400).json({error: 'name is required'})
    }
    if(!email || !validator.isEmail(email)){
      return res.status(400).json({error: 'email is required'})
    }
    if(!password || !validator.isStrongPassword(password, {
      minUppercase: 0,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0
    })){
      return res.status(400).json({error: 'password is required'})
    }
    await connectDB()
    const existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({error: 'email is existed'})
    }
    const passwordHass = await bcrypt.hash(password, 8)
    const user = await User.create({name, email, password: passwordHass})
    res.status(201).json(user)
  }
  catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
  
}