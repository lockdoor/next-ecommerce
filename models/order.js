import { Schema, model, models, Types } from "mongoose";

const orderSchema = new Schema(
  {
    buyer: { type: Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Types.ObjectId, ref: "Product", required: true },
        amount: { type: Number, required: true, default: 1 },
      },
    ],
    payment: {},
    address: { type: Types.ObjectId, required: true },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

// cartSchema.index({user: 1, product: 1}, { unique: true })
const Order = models.Order || new model("Order", orderSchema);

export default Order;
