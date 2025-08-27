import { updateListNameDal } from "../dal/list.dal";
import {
  createProductDal,
  deleteProductDal,
  getProductsByListIdDal,
  updateProductDal,
} from "../dal/product.dal";
import { ProductInterface } from "../types/product.types";

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
    return await updateProductDal(prodactId, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductService = async (prodactId: string) => {
  try {
    return await deleteProductDal(prodactId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductsByListIdService = async (listId: string) => {
  try {
    return await getProductsByListIdDal(listId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateListNameService = async (listId: string, newName: string) => {
  try {
    return await updateListNameDal(listId, newName);
  } catch (error) {
    return Promise.reject(error);
  }
}
