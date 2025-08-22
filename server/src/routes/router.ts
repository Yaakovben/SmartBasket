import { Router, Request, Response } from "express";

export const router = Router();

// אנדפוינט לדוגמה
router.get("/", (req: Request, res: Response) => {
  res.send("API עובד!");
});
