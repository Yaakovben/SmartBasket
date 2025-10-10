import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";
import { CustomError } from "../utils/handleError";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// 📘 הרשמה
export const registerService = async (userName: string, password: string) => {
  try {
    // בדיקת תקינות שם המשתמש
    if (!userName || !password)
      throw new CustomError("Username and password are required", 400, "REGISTER-ERROR");

    const existingUser = await User.findOne({ userName });
    if (existingUser)
      throw new CustomError("Username already taken", 409, "REGISTER-ERROR");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, password: hashedPassword });

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 📗 התחברות
export const loginService = async (userName: string, password: string) => {
  try {
    // בדיקת תקינות הקלט
    if (!userName || !password)
      throw new CustomError("Username and password are required", 400, "LOGIN-ERROR");

    const user = await User.findOne({ userName });
    if (!user)
      throw new CustomError("User not found", 404, "LOGIN-ERROR");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new CustomError("Invalid password", 401, "LOGIN-ERROR");

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  } catch (error) {
    return Promise.reject(error);
  }
};