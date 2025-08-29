import { Types } from "mongoose";
import {
  checkingUserInListDal,
  createListDal,
  deleteListDal,
  joinToListDal,
  leaveListDal,
  updateListNameDal,
} from "../dal/list.dal";
import { CustomError } from "../utils/handleError";
import logger from "../helpers/logger";

export const createListService = async (listName: string, userId: string) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid userId", 400, "LIST-ERROR");

    const createList = await createListDal(listName, userId);
    return createList;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const joinToListService = async (listId: string, userId: string) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid listId or userId", 400, "LIST-ERROR");

    // בדיקה אם המשמש כבר קיים ברשימה
    const existing = await checkingUserInListDal(listId, userId);
    if (existing)
      throw new CustomError(
        "The user is already on the list.",
        400,
        "LIST-ERROR"
      );
    const updatedList = await joinToListDal(listId, userId);
    return updatedList;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const leaveListService = async (listId: string, userId: string) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(userId))
      throw new CustomError("Invalid listId or userId", 400, "LIST-ERROR");

    // בדיקה אם המשתמש קיים ברשימה
    const existing = await checkingUserInListDal(listId, userId);
    if (!existing)
      throw new CustomError(
        "The user does not exist in the list.",
        400,
        "LIST-ERROR"
      );

    // הסרת המשתמש מהרשימה
    const updatedList = await leaveListDal(listId, userId);

    // אם אין יותר משתמשים ברשימה מחיקת הרשימה
    if (updatedList?.userIds.length === 0) {
      const deleteList = await deleteListDal(listId);
      if (deleteList) {
        logger(
          "HTTP",
          `List with id ${listId} deleted because it was empty after user left.`,
          "greenBright",
          "blueBright"
        );
      }
    }
    return updatedList;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateListNameService = async (
  listId: string,
  newName: string
) => {
  try {
    // Id בדיקת תקינות ה
    if (!Types.ObjectId.isValid(listId))
      throw new CustomError("Invalid listId ", 400, "LIST-ERROR");
    const updatedList = await updateListNameDal(listId, newName);
    return updatedList;
  } catch (error) {
    return Promise.reject(error);
  }
};
