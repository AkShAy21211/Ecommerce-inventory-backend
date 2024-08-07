import {  z } from "zod";

export const varientsSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(varientsSchema),
  inventory: inventorySchema,
});

export default productValidationSchema;
