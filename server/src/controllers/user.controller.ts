import { Request, Response } from "express";
import { loginService, registerService } from "../services/user.service";
import { handleError } from "../utils/handleError";

export async function registerController(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const user = await registerService(userName, password);
    res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const result = await loginService(userName, password);
    res.status(200).json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}
