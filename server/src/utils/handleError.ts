import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../helpers/logger";

// Defines a CustomError class for structured error handling and a handleError function to log errors and send appropriate HTTP responses.

export class CustomError {
  status: StatusCodes;
  message: string;
  tag: string;
  name: string;
  constructor(
    message: string,
    status: StatusCodes,
    tag: string,
    name?: string
  ) {
    this.message = message;
    this.status = status;
    this.tag = tag;
    this.name = name ?? message;
  }
}

export const handleError = (
  res: Response,
  error: CustomError | Error | any,
  status: StatusCodes = 400,
  tag: string = "HTTP"
) => {
  if (error instanceof CustomError) {
    logger(error.tag, error.message, "redBright");
    res.status(error.status).send({ message: error.message });
  } else {
    logger(tag, error.message, "redBright");
    res.status(status).send({ message: error.message });
  }
};
