import  { model, Schema } from "mongoose";
import { TOrder } from "./orders.interface";

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const orderModel = model("Order", orderSchema);
