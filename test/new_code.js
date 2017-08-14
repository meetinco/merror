/**
 * Created by gukong on 2017/8/14.
 */
const {errorCode, defineCode} = require('../error_code');

/** 非法的商品ID */
errorCode.INVALID_PRODUCT_ID = defineCode(3469, '非法的商品ID');

module.exports = errorCode;