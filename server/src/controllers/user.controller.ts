import { Request, Response } from "express";
import { loginService, registerService } from "../services/user.service";

export async function registerController(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const user = await registerService(userName, password);
    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const result = await loginService(userName, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
