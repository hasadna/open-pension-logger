import {Severity} from "coralogix-logger";
const {debug, info, error, critical, warning, verbose} = Severity;

export type DebugLevel = "debug" | "info" | "warning" | "error" | "critical" | "verbose";
export type LoggerConfig = {
  APPLICATION_NAME: string,
  PRIVATE_KEY: string,
  SERVICE: string,
  CATEGORY: string,
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
