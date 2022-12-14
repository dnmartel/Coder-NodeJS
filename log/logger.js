import { createLogger, transports, format, addColors } from "winston";

const { combine, timestamp, colorize, simple, prettyPrint } = format;
const { Console, File } = transports;

addColors({
    error: "redBG",
    warn: "yellow",
    info: "green"
});

const LEVEL = Symbol.for("level");

const levelOnly = (level) =>
    format((info) => {
        return info[LEVEL] === level && info;
    })();

export const logger = createLogger({
    level: "info",
    transports: [
        new Console({
            level: "info",
            format: combine(colorize(), simple())
        }),
        new File({
            filename: "./log/warn.log",
            level: "warn",
            format: levelOnly("warn")
        }),
        new File({
            filename: "./log/error.log",
            level: "error",
            format: levelOnly("error")
        })
    ],
    format: combine(timestamp(), simple(), prettyPrint())
});
