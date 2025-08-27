import {
  checkingUserInListDal,
  createListDal,
  deleteListDal,
  joinToListDal,
  leaveListDal,
} from "../dal/list.dal";

export const checkingUserInListSerice = async (
  listName: string,
  userId: string
) => {
  try {
    return await checkingUserInListDal(listName, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createListService = async (listName: string, userId: string) => {
  try {
    return await createListDal(listName, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const joinToListService = async (listId: string, userId: string) => {
  try {
    return await joinToListDal(listId, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const leaveListService = async (listId: string, userId: string) => {
  try {
    return await leaveListDal(listId, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};


