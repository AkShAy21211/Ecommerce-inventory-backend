import { orderModel } from "./order.model";
import { TOrder } from "./orders.interface";

export const createNewOrder = async (order: TOrder) => {
  try {
    return await orderModel.create(order);
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrdersFromDB = async (query: string | undefined) => {
  try {
    const filter = query ? { email: query } : {};

    return await orderModel.find(filter);
  } catch (error) {
    console.log(error);
  }
};
