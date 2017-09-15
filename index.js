
const utils = require('./utils');
const errorCode = require('./error_code');
const callerId = require('caller-id');
/**
 * 自己的错误类。可以通过stack打印出堆栈信息。其中返回网页端的message会根据code自动设置好。成员如下：
 * {number} code 返回的json对象中的status.code值
 * {string} message 错误信息，返回给网页端，显示给用户看的
 * {string} debugMessage debug信息，在测试环境会替代message返回给网页端
 * {number} status http状态码
 * {string} stack 错误堆栈
 * {object} data 返回的json对象中的data值
 */
class MError extends Error {
    /**
     * @param {number | object} code 返回的json对象中的status.code值，取值在下面维护
     * @param {string | Error, optional} debugMessage debug信息，在测试环境会替代message返回给网页端。也可以直接传一个Error对象进来，会复制它的message和stack
     * @param {number, optional} status http状态码。可不填，默认为200
     */
    constructor(code, debugMessage, status) {
        if (typeof code === 'object') {
            code = code.code;
        }
        super(utils.getCodeData(code).message);
        this.code = code !== undefined ? code : MError.UNKNOWN;
        if (debugMessage instanceof Error) {
            Object.defineProperty(this, 'stack', {
                get() {
                    return debugMessage.stack;
                }
            });
            this.debugMessage = debugMessage.message;
        } else {
            // 将错误堆栈设置为调用该方法的地方
            Error.captureStackTrace(this, MError);
            this.debugMessage = debugMessage !== undefined ? debugMessage : this.message;
        }
        // 默认200表示这是一个已捕获的错误。500表示未捕获的原生Error
        this.status = status !== undefined ? status : 200;
    }

    /**
     * 设置异常的message中的模板数据。仅当message为带有特殊符号的模板字符串时起作用
     * @param {Array} datas 第一个将会替换message模板中的${1}，第2个替换${2}...
     * @return {MError}
     */
    setMessageTemplateData(datas) {
        this.message = this.message.replace(/\$\{(\d+)\}/g, (ignore, index) => datas[parseInt(index, 10) - 1] || '');
        this.debugMessage = this.debugMessage.replace(/\$\{(\d+)\}/g, (ignore, index) => datas[parseInt(index, 10) - 1] || '');
        return this;
    }

    /**
     * 在异常中保存一份数据，会返回给网页端
     * @param {object} data 会返回给网页端的数据，对应回包中的data字段
     * @return {MError}
     */
    setData(data) {
        this.data = data;
        return this;
    }

    /**
     * 在promise的catch中使用，忽略掉指定的异常，让后续的then得以执行
     * @param {number} code 异常的错误码
     * @param {*,optional} returnValue 选填的返回值，会进入下一个then
     * @return {Function}
     */
    static ignoreError(code, returnValue) {
        return (error) => {
            if (error.code === code) {
                return returnValue;
            } else {
                throw error;
            }
        }
    }

    static configErrorCode(code) {
        utils.configErrorCode(code)
    }

    static appendLine() {
        const callerData = callerId.getData(MError.appendLine);
        return (err) => {
            if (!(err instanceof Error)) {
                console.log('不是Error对象');
                return err;
            }
            if (err instanceof MError) {
                err.debugMessage = `${callerData.filePath}:${callerData.methodName}:${callerData.lineNumber}\n${err.debugMessage}`;
            }
            throw err;
        }
    }
}

MError.configErrorCode(errorCode);

module.exports = MError;

