import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string(),
  productId: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
});

export default orderValidationSchema;
