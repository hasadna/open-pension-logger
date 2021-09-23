import Coralogix from 'coralogix-logger';
import {DebugLevel, levels, LoggerConfig} from './Types';

let logger: any;

// Ignoring since process.env is lacking this settings.
// @ts-ignore
const {APPLICATION_NAME, PRIVATE_KEY, SERVICE, CATEGORY, CONSOLE_LOG_INVOCATION}: LoggerConfig = process.env;

function getLogger() {
  if (!logger) {
    const config = new Coralogix.LoggerConfig({
      applicationName: APPLICATION_NAME,
      privateKey: PRIVATE_KEY,
      subsystemName: SERVICE,
    });

    Coralogix.CoralogixLogger.configure(config);
    logger = new Coralogix.CoralogixLogger(CATEGORY);
  }

  return logger;
}

/**
 * Inserting a document to the ES logs index.
 */
export function log(text: string, level: DebugLevel = 'info') {
  const logger = getLogger();
  const log = {severity: levels[level], text};
  new Coralogix.Log(log);

  if (CONSOLE_LOG_INVOCATION) {
    console.log(log)
  }

  logger.addLog(log);
}
