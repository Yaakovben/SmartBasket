import { Router } from "express";
import {
  addProductController,
  deleteProductController,
  getProductsByListIdController,
  updateProductController,
} from "../controllers/product.controller";
import {
  createListController,
  joinToListController,
  leaveListController,
  updateListNameController,
} from "../controllers/list.controller";

export const router = Router();

router.post("/add-product", addProductController);
router.put("/update-product/:id", updateProductController);
router.get("/get-products-by-list/:listId", getProductsByListIdController);
router.delete("/delete-product/:id", deleteProductController);

router.post("/add-list", createListController);
router.patch("/join-to-list/:listId", joinToListController);
router.patch("/left-list/:listId", leaveListController);
router.patch("/update-list-name/:listId", updateListNameController);
