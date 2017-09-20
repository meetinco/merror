/**
 * Created by gukong on 2017/9/15.
 */
const DEFUALT_MESSAGE = '网络错误，请重试';
let codeInfoMap = [];

/**
 * 定义一个错误码
 * @param {number} code 错误码，必须唯一
 * @param {null | string, optional} message 错误描述，会下发给浏览器端让用户看见。若不填则使用默认值。
 *                                   通过特殊标志${1}或${2}等，配合MError的setMessageTemplateData方法可以嵌入变量
 * @param {boolean, optional} fatal 是否是致命错误，默认为true。致命错误在测试环境会显示大红条提示
 * @return {number}
 */
function defineCode(code, message, fatal) {
    if (codeInfoMap[code]) {
        throw new Error(`重复的错误码:${code}`);
    }
    codeInfoMap[code] = {
        message: message || `(${code})${DEFUALT_MESSAGE}`,
        fatal: fatal === undefined || fatal
    };
    return code;
}

/**
 * 获取错误码对应的错误信息
 * @param {number} code
 * @returns {{message: string, fatal: boolean}}
 */
exports.getCodeData = (code) => {
    if (codeInfoMap[code]) {
        return codeInfoMap[code];
    }
    console.error(`未知的错误码:${code}`);
    return {
        message: DEFUALT_MESSAGE,
        fatal: true
    };
};

exports.configErrorCode = (code) => {
    const keys = Object.keys(code);
    keys.forEach((key) => {
        const object = code[key];
        defineCode(object.code, object.message, object.fatal)
    })
};

exports.codeInfoMap = codeInfoMap;