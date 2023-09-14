import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the Winston logger
const logger = createLogger({
    level: 'info', // Default logging level, can be changed to debug, warn, error as needed
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log', // This will create a new log file every day with the date in the filename
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true, // Compress the log files
            maxSize: '20m', // Max size of log file until a new one is created
            maxFiles: '14d', // Keep logs for 14 days
        }),
    ],
});

export default logger;
