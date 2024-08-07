import  { model, Schema } from "mongoose";
import { TInventory, TProduct, TVarients } from "./product.interface";

const varientSchema = new Schema<TVarients>({
  type: String,
  value: String,
},{_id:false});

const inventorySchema = new Schema<TInventory>({
  quantity: Number,
  inStock: Boolean,
},{_id:false});
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  category: String,
  tags: [String],
  variants: [varientSchema],
  inventory: inventorySchema,
});

export const productModel = model("Product", productSchema);
