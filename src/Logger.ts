import Coralogix from 'coralogix-logger';
import {DebugLevel, levels, LogData, LoggerConfig, LogProps} from './Types';
import {hostname} from 'os';

let logger: any;

function getSettings(): LoggerConfig {
  // Ignoring since process.env is lacking this settings.
  // @ts-ignore
  const {CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY, CONSOLE_LOG_INVOCATION}: LoggerConfig = process.env;
  return {CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY, CONSOLE_LOG_INVOCATION};
}

/**
 * Init the logger object.
 * 
 * @returns The logger object.
 */
function getLogger() {
  let {CORALOGIX_APPLICATION_NAME, CORALOGIX_PRIVATE_KEY, CORALOGIX_SERVICE_NAME, CORALOGIX_CATEGORY}: LoggerConfig = getSettings();

  if (!CORALOGIX_APPLICATION_NAME) {
    CORALOGIX_APPLICATION_NAME = hostname();
  }

  if (!logger) {
    const config = new Coralogix.LoggerConfig({
      applicationName: CORALOGIX_APPLICATION_NAME,
      privateKey: CORALOGIX_PRIVATE_KEY,
      subsystemName: CORALOGIX_SERVICE_NAME,
    });

    Coralogix.CoralogixLogger.configure(config);
    logger = new Coralogix.CoralogixLogger(CORALOGIX_CATEGORY);
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
export function log({text, error}: LogData, level: DebugLevel = 'info') {
  const [
    {CONSOLE_LOG_INVOCATION}, logger, severity
  ] = [getSettings(), getLogger(), levels[level]];

  const logProps: LogProps = {text: {text}, severity};

  if (error) {
    logProps.text.error = {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    };
  }

  const log = new Coralogix.Log(logProps)

  if (CONSOLE_LOG_INVOCATION) {
    console.log(log)
  }

  logger.addLog(log, severity);
}
