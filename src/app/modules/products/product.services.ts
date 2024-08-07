import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

export const createProductToDB = async (prodectData: TProduct) => {
  const results = productModel.create(prodectData);

  return results;
};

export const getProductFromDB = async (item: string) => {
  const query = item ? { name: { $regex: item, $options: "i" } } : {};
  const products = await productModel.find(query).lean();

  return products;
};
export const getSingleProductFromDB = async (productId: string) => {
  const products = await productModel.findById(productId);

  return products;
};
export const updateProductInDB = async (productId: string, data: TProduct) => {
  const products = await productModel
    .findByIdAndUpdate(productId, data, { new: true })
    .lean();

  return products;
};

export const deleteProductFromDB = async (productId: string) => {
  const result = await productModel
    .findByIdAndDelete(productId)
  return result;
};