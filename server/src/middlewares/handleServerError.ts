import { Request, Response, NextFunction } from "express";
import logger from "../helpers/logger";

const handleServerError = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction // נשאר כדי ש-Express יזהה את זה כ-error middleware
) => {
  logger("SERVER-ERROR", error.message || error, "redBright");
  res.status(500).send({ message: error.message || "Internal Server Error" });
};

export default handleServerError;
