import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, unique: true},
  password: {type: String, required: true, trim: true},
  address: {type: String, trim: true},
  role: {type: Number, default: 0}
},{timestamps: true})

const User = models.User || model('User', userSchema)

export default User