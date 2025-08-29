import { Types } from "mongoose";
import { List } from "../models/ListModel";

export const checkingUserInListDal = async (
  listName: string,
  userId: string
) => {
  try {
    return await List.findOne({ listName, userIds: userId });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const createListDal = async (listName: string, userId: string) => {
  try {
    return await List.create({
      listName,
      userIds: [new Types.ObjectId(userId)],
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const joinToListDal = async (listId: string, userId: string) => {
  try {
    return await List.findOneAndUpdate(
      { _id: listId, userIds: { $ne: new Types.ObjectId(userId) } },
      { $addToSet: { userIds: new Types.ObjectId(userId) } },
      { new: true }
    );
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const leaveListDal = async (listId: string, userId: string) => {
  try {
    return await List.findOneAndUpdate(
      { _id: listId, userIds: new Types.ObjectId(userId) },
      { $pull: { userIds: new Types.ObjectId(userId) } },
      { new: true }
    );
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteListDal = async (listId: string) => {
  try {
    return await List.findByIdAndDelete(listId);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateListNameDal = async (listId: string, newName: string) => {
  try {
    return await List.findByIdAndUpdate(listId, { listName: newName });
  } catch (error: any) {
    return Promise.reject(error);
  }
};
