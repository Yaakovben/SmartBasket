import { Request, Response } from "express";
import {
  createProdctService,
  deleteProductService,
  getProductsByListIdService,
  updateProductService,
} from "../services/product.service";
import { CustomError, handleError } from "../utils/handleError";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProdctService(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    return handleError(res, error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductService(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ProducDeleted = await deleteProductService(id);
    res.json(ProducDeleted);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductsByListId = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const products = await getProductsByListIdService(listId);

    if (products.length === 0) {
      throw new CustomError(
        "No products found for this list",
        404,
        "PRODUCTS-ERROR"
      );
    }
    res.status(200).json(products);
  } catch (error) {
    return handleError(res, error);
  }
};
