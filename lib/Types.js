"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = void 0;
const coralogix_logger_1 = require("coralogix-logger");
const { debug, info, error, critical, warning, verbose } = coralogix_logger_1.Severity;
exports.levels = {
    'debug': debug,
    'info': info,
    'warning': warning,
    'error': error,
    'critical': critical,
    'verbose': verbose,
};
