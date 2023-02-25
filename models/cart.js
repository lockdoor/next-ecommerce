import {Schema, model, models, Types} from 'mongoose'

const cartSchema = new Schema({
  user: {type: Types.ObjectId, ref: "User", required: true},
  product: {type: Types.ObjectId, ref: "Product", required: true},
  amount: {type: Number, required: true, default: 1}
}, {timestamps: true})

cartSchema.index({user: 1, product: 1}, { unique: true })
const Cart = models.Cart || new model("Cart", cartSchema)

export default Cart