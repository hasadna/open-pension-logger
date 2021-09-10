"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.createIndex = void 0;
const elasticsearch_1 = require("elasticsearch");
let client;
function getESClient() {
    if (client) {
        return client;
    }
    client = new elasticsearch_1.Client({
        host: process.env.ELASTIC_SEARCH_ADDRESS,
        apiVersion: process.env.ELASTIC_API_VERSION,
    });
    return client;
}
/**
 * Creating the index. Should be called when the server starts.
 */
function createIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield getESClient().indices.create({
                index: 'logs',
                body: {
                    mappings: {
                        properties: {
                            text: { type: 'text' },
                            service: { type: 'text' },
                            time: { type: 'date' },
                            level: { type: 'text' }
                        }
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.createIndex = createIndex;
/**
 * Inserting a document to the ES logs index.
 */
function log(text, level = 'info') {
    const doc = {
        text,
        level,
        service: process.env.ELASTIC_SERVICE_NAME,
        time: new Date(),
    };
    return getESClient().bulk({
        refresh: true,
        body: [
            { index: { _index: 'logs' } },
            doc
        ]
    }).finally(() => {
        console.log(text);
    });
}
exports.log = log;
