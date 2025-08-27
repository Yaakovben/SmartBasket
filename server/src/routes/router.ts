import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductsByListId,
  updateProduct,
} from "../controllers/product.controller";
import {
  createList,
  joinToList,
  leaveList,
  updateListNameController,
} from "../controllers/list.controller";

export const router = Router();

router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProduct);
router.get("/get-products-by-list/:listId", getProductsByListId);
router.delete("/delete-product/:id", deleteProduct);

router.post("/add-list", createList);
router.patch("/join-to-list/:listId", joinToList);
router.patch("/left-list/:listId", leaveList);
router.patch("/update-list-name/:listId", updateListNameController);
