import {Client} from 'elasticsearch';
import {DebugLevel, LoggerConfig} from './Types';

let client: Client;


// Ignoring since process.env is lacking this settings.
// @ts-ignore
const {ELASTIC_SEARCH_ADDRESS, ELASTIC_API_VERSION, ELASTIC_SERVICE_NAME, NO_CONSOLE_LOG_INVOCATION}: LoggerConfig = process.env;

function getESClient() {
  if (client) {
    return client;
  }

  client = new Client({
    host: ELASTIC_SEARCH_ADDRESS,
    apiVersion: ELASTIC_API_VERSION,
  });

  return client;
}

/**
 * Creating the index. Should be called when the server starts.
 */
export async function createIndex() {
  try {
    await getESClient().indices.create({
      index: 'logs',
      body: {
        mappings: {
          properties: {
            text: { type: 'text' },
            service: { type: 'text' },
            time: { type: 'date' },
            level: {type: 'text'}
          }
        }
      }
    })
  } catch (e) {
    if (NO_CONSOLE_LOG_INVOCATION) {
      return;
    }
    console.log(e);
  }
}

/**
 * Inserting a document to the ES logs index.
 */
export function log(text: string, level: DebugLevel = 'info') {
  const doc = {
    text,
    level,
    service: ELASTIC_SERVICE_NAME,
    time: new Date(),
  };

  return getESClient().bulk({
    refresh: true,
    body: [
      { index: { _index: 'logs' } },
      doc
    ]
  }).finally(() => {

    if (NO_CONSOLE_LOG_INVOCATION) {
      return;
    }
    console.log(text)
  });
}
