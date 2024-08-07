import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { productModel } from "../products/product.model";
import { getSingleProductFromDB } from "../products/product.services";
import { createNewOrder, getAllOrdersFromDB } from "./order.services";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const zodValidation = orderValidationSchema.safeParse(req.body);

    // save order to db here
    if (
      typeof zodValidation.error !== "undefined" &&
      zodValidation.error.name === "ZodError"
    ) {
      const errorList = zodValidation.error.issues.map((err) => err.message);

      return res.status(200).json({
        success: false,
        message: "validation error",
        errorList: errorList,
      });
    }

    if (zodValidation.success) {
      const product = await getSingleProductFromDB(
        zodValidation.data.productId
      );

      if (product && product.inventory.quantity < zodValidation.data.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity product not available",
        });
      }

      if (product) {
        product.inventory.quantity =
          product.inventory.quantity - zodValidation.data.quantity;
        product.inventory.inStock =
          product.inventory.quantity === 0 ? false : true;
        const newOrder = await createNewOrder(zodValidation.data);
        await product.save();

        return res.status(200).json({
          success: true,
          message: "Order placed successfully",
          data: newOrder,
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllOrder = async (req: Request, res: Response) => {
  const email = req.query.email;

  try {
    const orders = await getAllOrdersFromDB(email as string | undefined);

    if (orders?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
