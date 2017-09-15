### Example
err_code.js
```javascript
const code = {
    INVALID_PRODUCT_ID: {
        code: 3469,
        message: '非法的商品ID'
    }
};

module.exports = code;
```

index.js
```javascript
const ErrCode = './err_code';
const MError = require('merror-meetin');
MError.configErrorCode(ErrCode);

const err = new MError(ErrCode.INVALID_PRODUCT_ID);
console.log('code', err.code, err.debugMessage, err.message);
```

Read codes in `test` for more information.