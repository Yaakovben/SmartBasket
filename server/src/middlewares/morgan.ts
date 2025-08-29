// Configures a custom morgan logger to log HTTP requests, highlighting errors in red and successful responses in green, with timestamps.
import morgan from "morgan";
import chalk from "chalk";
import { loggerTime } from "../helpers/time.helpers";


const morganLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const Response_time = tokens["response-time"](req, res);
  const logString = [method, url, status, Response_time].join(" ");
  return +status! >= 400
    ? chalk.yellowBright("[HTTP]") +
        `${loggerTime()} - ` +
        chalk.redBright(logString)
    : chalk.yellowBright("[HTTP]") +
        `${loggerTime()} - ` +
        chalk.greenBright(logString);
});

export default morganLogger;
