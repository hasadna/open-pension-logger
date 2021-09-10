# Open Pension Logger

This is the repo for the open pension logger. The logger will send data to ES to store events in the `logs` index.

## requirements

In order to work with the logger you'll need to set up the next env variables:

* `ELASTIC_SEARCH_ADDRESS` - The address of the elastic search address
* `ELASTIC_API_VERSION` - The version of elastic search
* `ELASTIC_SERVICE_NAME` - The name of the service.

## Working with the package

```js
import {createIndex, log} from "open-pension-logger";

// Creating the index. This should takes place when the server starts. 
await createIndex();

// Logging the event.
log(`This is a message`);
```
