import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;
// Go one level above (back to 'src')

const srcDir = path.resolve(currentDir, "..");

/**
 * The directory path of the 'logging' folder.
 * @type {string}
 */
const loggingDir = path.resolve(srcDir, "logging");


/**
 * A custom log format function.
 * @param {Object} info - Log information object containing level, message, and timestamp.
 * @returns {string} - Formatted log entry.
 */
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Set the desired timezone
// const timeZone = 'America/New_York'; // For the US
//const timeZone = "Asia/Kolkata"; // For India

/**
 * The desired timezone for logging.
 * @type {string}
 */
const timeZone = "Europe/London"; // For the UK

/**
 * The logger instance.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  format: 
  // Combine the timestamp formatting with the custom log format
winston.format.combine(
  // Format the timestamp using the specified timezone
  winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
  // Apply the custom log format
  customFormat
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_run.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024, // 10 KB, specify the size in bytes
      level: "error",
    }),
  ],
});


export default logger;