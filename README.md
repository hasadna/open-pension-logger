# Open Pension Logger

This is the repo for the open pension logger. The logger will send data to ES to store events in the `logs` index.

## requirements

In order to work with the logger you'll need to set up the next env variables:

* `ELASTIC_SEARCH_ADDRESS` - The address of the elastic search address
* `ELASTIC_SERVICE_NAME` - The name of the service
* `NO_CONSOLE_LOG_INVOKATION` - Boolean, optional; When turned on, the `console.[log|error|warn|...]` won't invoke. Turn on in production. 

## Working with the package

```js
import {createIndex, log} from "open-pension-logger";

// Creating the index. This should takes place when the server starts. 
await createIndex();

// Logging the event.
log(`This is a message`);
```

## Development stuff

### Sandbox
In case you need to test your code you can do this using the sandbox. Copy the file `sandbox.example.ts` to `sandbox.ts`
and in the `sandbox` you can write your code. In order to see the changes live use the next command:
```bash
npm run sandbox 
```

### Before deployment
In before deployment you need run the next command:
```bash
npm run prepareDeployment
```

This will compile the typescript to simple JS.
