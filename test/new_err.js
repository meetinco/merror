/**
 * Created by gukong on 2017/8/14.
 */
const MError = require('../index');
const newCode = require('./new_code');

MError.configureErrorCode(newCode);

module.exports = MError;
