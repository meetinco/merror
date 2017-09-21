/**
 * Created by gukong on 2017/8/14.
 */

const newCode = require('./new_code');
const MError = require('../index');
MError.configErrorCode(newCode);

// const newCodeCopy = require('./new_code_copy');
// MError.configErrorCode(newCodeCopy);

exports.foo = () => {
    return Promise.resolve('')
        .then(() => {
            throw new MError(MError.INVALID_PRODUCT_ID).setMessageTemplateData(['被删除doc']);
        })
        .catch(MError.prependCodeLine())
        .catch((err) => {
            console.log(err.debugMessage);
        })
}

exports.foo()