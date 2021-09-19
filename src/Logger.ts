import {Client} from '@elastic/elasticsearch';
import {DebugLevel, LoggerConfig} from './Types';

let client: Client;


// Ignoring since process.env is lacking this settings.
// @ts-ignore
const {ELASTIC_SEARCH_ADDRESS, ELASTIC_SERVICE_NAME, NO_CONSOLE_LOG_INVOCATION}: LoggerConfig = process.env;

function getESClient(): Client {
  if (client) {
    return client;
  }

  client = new Client({
    node: 'http://localhost:9200',
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
    body: [
      { index: { _index: 'logs' } },
      doc
    ]
  })
    .catch(e => {})
    .finally(() => {

    if (NO_CONSOLE_LOG_INVOCATION) {
      return;
    }
    console.log(text)
  });
}
