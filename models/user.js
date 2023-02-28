import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  name: {type: String, require: true},
  province: {type: String, require: true},
  amphoe: {type: String, require: true},
  district: {type: String, require: true},
  etc: {type: String, require: true},
  phone: {type: String, require: true},
  zipcode: {type: Number, require: true},
  isMain: {type: Boolean, default: false}
},{timestamps: true})

const userSchema = new Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, unique: true},
  password: {type: String, required: true, trim: true},
  addresses: [addressSchema],
  role: {type: Number, default: 0}
},{timestamps: true})

const User = models.User || model('User', userSchema)

export default User