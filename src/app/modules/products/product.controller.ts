import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import {
  createProductToDB,
  deleteProductFromDB,
  getProductFromDB,
  getSingleProductFromDB,
  updateProductInDB,
} from "./product.services";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParser = productValidationSchema.parse(req.body);

    const results = await createProductToDB(zodParser);

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { item } = req.query;
    const products = await getProductFromDB(item as string);
    res.status(200).json({
      message: "Product retrived successfully",
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const products = await getSingleProductFromDB(productId as string);
    res.status(200).json({
      message: "Product retrived successfully",
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const  data  = req.body;
    const products = await updateProductInDB(productId as string, data);
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await deleteProductFromDB(productId as string);
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
