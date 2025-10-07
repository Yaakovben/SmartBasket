import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export async function registerService(userName: string, password: string) {
  const existingUser = await User.findOne({ userName });
  if (existingUser) throw new Error("Username already taken");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, password: hashedPassword });
  return user;
}

export async function loginService(userName: string, password: string) {
  const user = await User.findOne({ userName });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { user, token };
}
