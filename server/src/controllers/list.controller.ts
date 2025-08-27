import chalk from "chalk";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { List } from "../models/ListModel";
import {
  checkingUserInListSerice,
  createListService,
  joinToListService,
  leaveListService,
} from "../services/list.service";
import { deleteListDal, updateListNameDal } from "../dal/list.dal";
import { updateListNameService } from "../services/product.service";

export const createList = async (req: Request, res: Response) => {
  try {
    const { listName, userId } = req.body;

    // בדיקה שהפרמטרים הגיעו
    if (!listName || !userId) {
      return res
        .status(400)
        .json({ error: "listName and userId are required" });
    }

    // בדיקה אם userId הוא ObjectId חוקי
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // בדיקה אם המשתמש כבר יצר רשימה עם אותו שם
    const existing = await checkingUserInListSerice(listName, userId);
    if (existing) {
      console.log(
        chalk.bgYellowBright(
          `User ${userId} already has a list named "${listName}"`
        )
      );
      return res
        .status(400)
        .json({ error: "You already have a list with this name" });
    }

    // יצירת הרשימה והוספת המשתמש שיוצר אותה
    const newList = await createListService(listName, userId);
    console.log(
      chalk.bgCyanBright(`List created: "${listName}" by user ${userId}`)
    );

    res.status(201).json(newList);
  } catch (error) {
    console.error(chalk.bgRedBright("Error creating list:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const joinToList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    if (!listId || !userId)
      return res.status(400).json({ error: "listId and userId are required" });

    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Invalid listId or userId" });

    // בדיקה והוספה ב-query אחד עם $ne + $addToSet
    const updatedList = await joinToListService(listId, userId);
    if (!updatedList) {
      console.log(
        chalk.bgYellowBright(`User ${userId} already in list ${listId}`)
      );
      return res.status(400).json({ error: "User already in the list" });
    }

    console.log(
      chalk.bgGreenBright(
        `User ${userId} joined list "${updatedList.listName}"`
      )
    );
    res.json(updatedList);
  } catch (error) {
    console.error(chalk.bgRedBright("Error joining list:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const leaveList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    if (!listId || !userId)
      return res.status(400).json({ error: "listId and userId are required" });

    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Invalid listId or userId" });

    // הסרת המשתמש מהרשימה
    const updatedList = await leaveListService(listId, userId);

    if (!updatedList) {
      console.log(
        chalk.bgYellowBright(`User ${userId} was not in list ${listId}`)
      );
      return res.status(400).json({ error: "User not in the list" });
    }

    // אם אין יותר משתמשים ברשימה → מחיקה אוטומטית
    if (updatedList.userIds.length === 0) {
      await deleteListDal(listId);
      console.log(
        chalk.bgYellowBright(
          "User left and list was deleted because it's empty"
        )
      );
      return res.json({
        message: "User left and list was deleted because it's empty",
      });
    }

    console.log(
      chalk.bgBlueBright(`User ${userId} left list "${updatedList.listName}"`)
    );
    res.json(updatedList);
  } catch (error) {
    console.error(chalk.bgRedBright("Error leaving list:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateListNameController = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { newName } = req.body;

    if (!listId || !newName)
      return res.status(400).json({ error: "listId and newName are required" });

    if (!Types.ObjectId.isValid(listId))
      return res.status(400).json({ error: "Invalid listId" });

    // עדכון שם הרשימה בלבד
    const updatedList = await updateListNameService(listId, newName);

    if (!updatedList) {
      console.log(chalk.bgYellowBright(`List ${listId} not found`));
      return res.status(404).json({ error: "List not found" });
    }

    console.log(
      chalk.bgMagentaBright(
        `List "${updatedList.listName}" updated successfully`
      )
    );
    res.json(updatedList);
  } catch (error) {
    console.error(chalk.bgRedBright("Error updating list name:"), error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
