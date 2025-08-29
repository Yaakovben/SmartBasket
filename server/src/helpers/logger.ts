import chalk from "chalk";
import type { Color } from "chalk";
import { loggerTime } from "./time.helpers";

// Creates a custom logger function to format and colorize log messages with tags and timestamps using chalk.

const logger = (
  tag: string,
  message: string,
  color: typeof Color = "greenBright",
  tagColor: typeof Color = "yellowBright"
) => {
  console.log(
    chalk[tagColor](`[${tag}]`) + loggerTime() + chalk[color](` - ${message}`)
  );
};

export default logger;
