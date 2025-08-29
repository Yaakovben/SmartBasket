import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  createListService,
  joinToListService,
  leaveListService,
  updateListNameService,
} from "../services/list.service";
import { handleError } from "../utils/handleError";

// יצירת רשימה חדשה
export const createListController = async (req: Request, res: Response) => {
  try {
    const { listName, userId } = req.body;
    // יצירת הרשימה והוספת המשתמש שיוצר אותה
    const newList = await createListService(listName, userId);
    res.json(newList);
  } catch (error) {
    return handleError(res, error);
  }
};

// הצטרפות לרשימה קיימת
export const joinToListController = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    const updatedList = await joinToListService(listId, userId);
    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};

// עזיבת רשימה
export const leaveListController = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    const updatedList = await leaveListService(listId, userId);
    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};

// עדכון שם הרשימה
export const updateListNameController = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { newName } = req.body;

    const updatedList = await updateListNameService(listId, newName);
    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};
