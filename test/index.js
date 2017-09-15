/**
 * Created by gukong on 2017/8/14.
 */

const newCode = require('./new_code');
const MError = require('../index');
MError.configErrorCode(newCode);

exports.foo = () => {
    return Promise.resolve('')
        .then(() => {
            throw new MError(newCode.INVALID_PRODUCT_ID);
        })
        .catch(MError.appendLine())
        .catch((err) => {
            console.log('code', err.debugMessage);
        })
}

exports.foo()