import { Request, Response } from "express";
import {
  createProdctService,
  deleteProductService,
  getProductsByListIdService,
  updateProductService,
} from "../services/product.service";
import { CustomError, handleError } from "../utils/handleError";

// הוספת מוצר חדש
export const addProductController = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProdctService(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    return handleError(res, error);
  }
};

// עדכון מוצר קיים
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductService(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    return handleError(res, error);
  }
};

// מחיקת מוצר
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ProducDeleted = await deleteProductService(id);
    res.json(ProducDeleted);
  } catch (error) {
    return handleError(res, error);
  }
};

// של רשימה ID קבלת כל המוצרים לפי
export const getProductsByListIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { listId } = req.params;
    const products = await getProductsByListIdService(listId);
    res.status(200).json(products);
  } catch (error) {
    return handleError(res, error);
  }
};
