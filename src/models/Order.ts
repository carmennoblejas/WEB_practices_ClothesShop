import { Product } from "./Product";
import { User } from "./User";
import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Types.ObjectId, ref: "Product", required: true },
      qty: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default model("Order", OrderSchema);

