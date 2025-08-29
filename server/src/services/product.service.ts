import { Types } from "mongoose";
import {
  createProductDal,
  deleteProductDal,
  getProductsByListIdDal,
  updateProductDal,
} from "../dal/product.dal";
import { ProductInterface } from "../types/product.types";
import { CustomError } from "../utils/handleError";

export const createProdctService = async (data: ProductInterface) => {
  try {
    return await createProductDal(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProductService = async (
  prodactId: string,
  data: ProductInterface
) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(prodactId))
      throw new CustomError("Invalid prodactId", 400, "PRODUCT-ERROR");

    return await updateProductDal(prodactId, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductService = async (prodactId: string) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(prodactId))
      throw new CustomError("Invalid prodactId", 400, "PRODUCT-ERROR");
    return await deleteProductDal(prodactId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductsByListIdService = async (listId: string) => {
  try {
     // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(listId))
      throw new CustomError("Invalid listId", 400, "PRODUCT-ERROR");
    return await getProductsByListIdDal(listId);
  } catch (error) {
    return Promise.reject(error);
  }
};
