export type DebugLevel = "debug" | "info" | "warn" | "error" | "fatal";
export type LoggerConfig = {
  ELASTIC_SEARCH_ADDRESS: string,
  ELASTIC_API_VERSION: string,
  ELASTIC_SERVICE_NAME: string,
  NO_CONSOLE_LOG_INVOCATION: boolean,
};
