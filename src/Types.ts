import {Severity} from "coralogix-logger";
const {debug, info, error, critical, warning, verbose} = Severity;

export type DebugLevel = "debug" | "info" | "warning" | "error" | "critical" | "verbose";
export type LoggerConfig = {
  CORALOGIX_APPLICATION_NAME: string,
  CORALOGIX_PRIVATE_KEY: string,
  CORALOGIX_SERVICE_NAME: string,
  CORALOGIX_CATEGORY: string,
  CONSOLE_LOG_INVOCATION: boolean,
};

export const levels: { [key: string]: Severity } = {
  'debug': debug,
  'info': info,
  'warning': warning,
  'error': error,
  'critical': critical,
  'verbose': verbose,
};

export type LogData = {
  text: any,
  error?: any
};

export type LogProps = {
  severity: Severity,
  text: {
    text: any,
    error?: {
      stack?: string,
      message?: string,
      name?: string,
    }
  },
};
