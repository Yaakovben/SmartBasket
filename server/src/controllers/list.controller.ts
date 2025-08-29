import chalk from "chalk";
import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  checkingUserInListSerice,
  createListService,
  joinToListService,
  leaveListService,
} from "../services/list.service";
import { deleteListDal, updateListNameDal } from "../dal/list.dal";
import { updateListNameService } from "../services/product.service";
import { CustomError, handleError } from "../utils/handleError";
import logger from "../helpers/logger";

export const createList = async (req: Request, res: Response) => {
  try {
    const { listName, userId } = req.body;

    // בדיקה אם userId הוא ObjectId חוקי
    if (!Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid userId", 400, "LIST-ERROR");

    // בדיקה אם המשתמש כבר יצר רשימה עם אותו שם
    const existing = await checkingUserInListSerice(listName, userId);
    if (existing)
      throw new CustomError(
        "List name already exists for this user",
        400,
        "LIST-ERROR"
      );

    // יצירת הרשימה והוספת המשתמש שיוצר אותה
    const newList = await createListService(listName, userId);

    res.json(newList);
  } catch (error) {
    return handleError(res, error);
  }
};

export const joinToList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid listId or userId", 400, "LIST-ERROR");

    const updatedList = await joinToListService(listId, userId);
    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};

export const leaveList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid listId or userId", 400, "LIST-ERROR");

    // הסרת המשתמש מהרשימה
    const updatedList = await leaveListService(listId, userId);
    // אם אין יותר משתמשים ברשימה → מחיקה אוטומטית
    if (updatedList?.userIds.length === 0) {
      await deleteListDal(listId);

      // return res.json({
      //   message: "User left and list was deleted because it's empty",
      // });
    }

    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateListNameController = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { newName } = req.body;

    if (!Types.ObjectId.isValid(listId))
      throw new CustomError("Invalid listId ", 400, "LIST-ERROR");

    // עדכון שם הרשימה בלבד
    const updatedList = await updateListNameService(listId, newName);

    res.json(updatedList);
  } catch (error) {
    handleError(res, error);
  }
};
