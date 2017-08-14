### Example
```
const MError = require('merror');

const err = new MError(MError.HTTP_UNAUTHORIZED);
console.log('code', err.code, err.debugMessage, err.message);
```

### Files & Usage
* index.js   
    `index.js` exports the `MError` Class. You can use it directly.  
    Also, you can append new error code. Reading the code wrote in `test/new_err`.   
    And you maybe want to know how to defined new `Error Code`. See below.  
    
* error_code.js  
    `error_code.js` exports `errorCode` and `defineCode`. If you want to know how to use it. Reading the code wrote in `test/new_code.js`.