# Open Pension Logger

A simplified way to work against coralogix.

## requirements

In order to work with the logger you'll need to set up the next env variables:

* `CORALOGIX_APPLICATION_NAME` - The application name - `Open Pension staging`, `Open Pension staging`. In case this is 
* not set then the computer name will be used as the value
* `CORALOGIX_PRIVATE_KEY` - The private key from coralogix
* `CORALOGIX_SERVICE_NAME` - The name of the service - `backoffice`, `notification` etc .etc. 
* `CORALOGIX_CATEGORY` - The name of the category. Optional.
* `CONSOLE_LOG_INVOCATION` - Boolean, optional; When turned on, the `console.[log|error|warn|...]` will invoke. Don't 
   set it in production mode.

## Working with the package

```js
import {log} from "open-pension-logger";

// Logging the event.
log({text: 'This is a message'});

// You can use a try catch like that:
const foo = () => {
   throw new Error('Pizza with pineappel is bad')
};

try {
   foo();
} catch (error) {
   log({text: 'you do not have permissions', error}, 'error');
}
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
