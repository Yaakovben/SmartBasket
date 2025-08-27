import { Product } from "../models/ProductModel";
import { ProductInterface } from "../types/product.types";

export const createProductDal = async ({
  listId,
  name,
  quantity,
  imageUrl,
}: ProductInterface) => {
  try {
    return await Product.create({ listId, name, quantity, imageUrl });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProductDal = async (
  productId: string,
  data: ProductInterface
) => {
  try {
    return await Product.findByIdAndUpdate(
      productId,
      data,
      { new: true } // מחזיר את המוצר המעודכן
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProductDal = async (prodactId: string) => {
  try {
    return await Product.findByIdAndDelete(prodactId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProductsByListIdDal = async (listId: string) => {
  try {
    return await Product.find({ listId }).sort({ createdAt: 1 }); // ממיין לפי תאריך יצירה
  } catch (error: any) {
    throw new Error(error);
  }
};
