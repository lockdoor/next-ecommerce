import { Schema, model, models, Types } from "mongoose";

const productSchema = new Schema({
  name: {type: String, trim: true, maxLength: 160, required: true},
  slug: {type: String, trim: true, lowercase: true, required: true, unique: true},
  description: {type: String, maxLength: 2000, required: true},
  price: {type: Number, required: true},
  category: {type: Types.ObjectId, ref: "Category", required: true},
  quantity: {type: Number, required: true},
  sold: {type: Number, default: 0},
  photo: {data: Buffer, contentType: String},
  shipping: {type: Boolean, required: false}
}, {timestamps: true})

const Product = models.Product || new model("Product", productSchema)

export default Product