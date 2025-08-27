import { Request, Response } from "express";
import { Product } from "../models/ProductModel";
import chalk from "chalk";
import { List } from "../models/ListModel";
import { Types } from "mongoose";
import {
  createProdctService,
  deleteProductService,
  getProductsByListIdService,
  updateProductService,
} from "../services/product.service";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProdctService(req.body);
    res.status(201).json(newProduct);
    console.log(chalk.bgCyanBright("Product added successfully!"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductService(id, req.body);
    res.status(200).json(updatedProduct);
    console.log(chalk.bgBlueBright(`Product updated successfully`));
  } catch (error) {
    console.error(chalk.bgRedBright("Error updating product:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ProducDeleted = await deleteProductService(id);
    res.status(200).json(ProducDeleted);
    console.log(chalk.bgMagentaBright(`Product deleted successfully`));
  } catch (error) {
    console.error(chalk.bgRedBright("Error deleting product:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProductsByListId = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;

    const products = await getProductsByListIdService(listId);

    if (products.length === 0) {
      console.log(chalk.bgYellowBright(`No products found for list ${listId}`));
      return res
        .status(404)
        .json({ message: "No products found for this list" });
    }

    console.log(
      chalk.bgCyanBright(
        `Fetched ${products.length} products for list ${listId}`
      )
    );
    res.status(200).json(products);
  } catch (error) {
    console.error(chalk.bgRedBright("Error fetching products:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
