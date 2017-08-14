/**
 * Created by gukong on 2017/8/14.
 */

const MError = require('./new_err');

const err = new MError(MError.HTTP_UNAUTHORIZED);
console.log('code', err.code, err.debugMessage, err.message);