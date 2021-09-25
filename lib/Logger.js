"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const coralogix_logger_1 = __importDefault(require("coralogix-logger"));
const Types_1 = require("./Types");
const os_1 = require("os");
let logger;
function getSettings() {
    // Ignoring since process.env is lacking this settings.
    // @ts-ignore
    const { CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY, CONSOLE_LOG_INVOCATION } = process.env;
    return { CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY, CONSOLE_LOG_INVOCATION };
}
/**
 * Init the logger object.
 *
 * @returns The logger object.
 */
function getLogger() {
    let { CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY } = getSettings();
    if (!CORALOGIX_APPLICATION_NAME) {
        CORALOGIX_APPLICATION_NAME = (0, os_1.hostname)();
    }
    if (!logger) {
        const config = new coralogix_logger_1.default.LoggerConfig({
            applicationName: CORALOGIX_APPLICATION_NAME,
            privateKey: CORALOGIX_PRIVATE_KEY,
            subsystemName: CORALOGIX_SERVICE_NAME,
        });
        coralogix_logger_1.default.CoralogixLogger.configure(config);
        logger = new coralogix_logger_1.default.CoralogixLogger(CORALOGIX_CATEGORY);
    }
    return logger;
}
/**
 *
 * @param {LogData} logData - The data to log
 * @param {any} logData.text - The information we want to log
 * @param {Error} logData.error - Optional; The error object
 * @param {DebugLevel} level - The type of the log data such as info, error. Default to `info`
 */
function log({ text, error }, level = 'info') {
    const [{ CONSOLE_LOG_INVOCATION }, logger, severity] = [getSettings(), getLogger(), Types_1.levels[level]];
    const logProps = { text: { text }, severity };
    if (error) {
        logProps.text.error = {
            message: error === null || error === void 0 ? void 0 : error.message,
            stack: error === null || error === void 0 ? void 0 : error.stack,
            name: error === null || error === void 0 ? void 0 : error.name
        };
    }
    const log = new coralogix_logger_1.default.Log(logProps);
    if (CONSOLE_LOG_INVOCATION) {
        console.log(log);
    }
    logger.addLog(log, severity);
}
exports.log = log;
