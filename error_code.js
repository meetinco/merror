/**
 * Created by gukong on 2017/8/14.
 */
const DEFUALT_MESSAGE = '网络错误，请重试';
const errorCode = {};
const codeInfoMap = [];

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
errorCode.getCodeData = function getCodeData(code) {
    if (codeInfoMap[code]) {
        return codeInfoMap[code];
    }
    console.error(`未知的错误码:${code}`);
    return {
        message: DEFUALT_MESSAGE,
        fatal: true
    };
};

/* eslint-disable no-template-curly-in-string */
/** 无错误 */
errorCode.SUCCESS = defineCode(0, '');

/** 不知名错误 */
errorCode.UNKNOWN = defineCode(1, '未知错误');

/** **********************************以下前端相关的错误码*********************************** */

/** 401未授权 */
errorCode.HTTP_UNAUTHORIZED = defineCode(1001, '请求未授权');

/** 前端请求超时 */
errorCode.HTTP_TIME_OUT = defineCode(1002, '网络超时，请重试');

/** 403禁止访问 */
errorCode.HTTP_FORBIDDEN = defineCode(1003, '禁止访问');

/** 404找不到 */
errorCode.HTTP_NOT_FOUND = defineCode(1004, '请求的网址不存在');

/** 其它前端请求网络错误 */
errorCode.HTTP_NETWORK_ERR = defineCode(1005, '网络连接错误，请重试');

/** 微信支付错误 */
errorCode.WECHAT_PAY_ERROR = defineCode(1006, '微信支付遇到问题，请重新支付');

/** **********************************以下发包相关的错误码*********************************** */

/** 域名被墙 */
errorCode.HOST_UNRESOLVED = defineCode(2001);

/** 还未连接上 */
errorCode.NOT_CONNECTED = defineCode(2002);

/** 服务器断开连接 */
errorCode.SERVER_CLOSED = defineCode(2003);

/** 发包超时 */
errorCode.TIME_OUT = defineCode(2004, '网络超时，请重试');

/** 已达到最大重发次数 */
errorCode.MAX_RETRY = defineCode(2005);

/** 解析包错误 */
errorCode.PARSE_ERROR = defineCode(2006);

/** 无法创建请求包 */
errorCode.PACKET_ERROR = defineCode(2008);

/** 指定的地址在远程机器上不可用 */
errorCode.ADDRESS_NOT_AVAILABLE = defineCode(2009);

/** socket连接尝试超时 */
errorCode.CONNCTION_TIMEDOUT = defineCode(2010);

/** 服务器主动拒绝建立连接 */
errorCode.CONNCTION_REFUSED = defineCode(2011);

/** 连接已被重置 */
errorCode.CONNCTION_RESET = defineCode(2012);

/** 从本机到给定addr的网络不通 */
errorCode.NETWORK_UNREACHABLE = defineCode(2013);

/** socket 已经连接 */
errorCode.IS_CONNECTED = defineCode(2014);

/** 端口号被占用 */
errorCode.ADDRESS_IN_USE = defineCode(2015);

/** socket 发送数据返回错误 */
errorCode.SOCKET_SEND_ERROR = defineCode(2016);

/** 参数错误 */
errorCode.PARAMETER_ERROR = defineCode(2017, '参数错误');

/** 服务器操作数据时返回错误 */
errorCode.SERVER_PROCESSCE_ERROR = defineCode(2018);

/** 服务器返回数据为空 */
errorCode.SERVER_RETURN_EMPTY_DATA = defineCode(2019);

/** 不允许把数据库中查出的数据直接下发到浏览器 */
errorCode.CANNOT_SEND_NATIVE_DATA = defineCode(2020);

/** 请求包过大 */
errorCode.REQUEST_TOO_LARGE = defineCode(2021, '数据量过大，发送失败');

/** 禁止访问该端口 */
errorCode.FORBIDDEN_PORT = defineCode(2022, '禁止访问该端口');

/** 被拦截的攻击请求 */
errorCode.HACK_DETECTED = defineCode(2023);

/** 已经回过包了，不能多次回包 */
errorCode.HAS_RESPONSED = defineCode(2024);

/** 服务器端向第三方服务器请求数据时错误 */
errorCode.THIRD_SEVER_ERROR = defineCode(2025);

/** **********************************以下是各业务用的错误码*********************************** */
/** 未登录，请求中没有找到自己的sessionKey */
errorCode.NOT_SIGNIN = defineCode(3001, '未登录，请登录后再试', false);

/** 登录态已过期，需要重新登录 */
errorCode.NEED_RELOGIN = defineCode(3002, '登录态已过期，请重新登录后再试', false);

/** 登录回包中没有返回id */
errorCode.LOGIN_NO_OPENID = defineCode(3003, '登录失败，请重试');

/** 登录回包中没有返回sessionKey */
errorCode.LOGIN_NO_SESSION_KEY = defineCode(3004, '登录失败，请重试');

/** 注册时发现手机号已注册 */
errorCode.SIGNUP_PHONE_EXIST = defineCode(3005, '该手机号已注册', false);

/** 服务器端返回的账号或密码错误 */
errorCode.SIGNIN_FAIL = defineCode(3006, '账号或密码错误', false);

/** 账号或密码格式错误 */
errorCode.SIGNIN_ACCOUNT_INVALID = defineCode(3007, '账号或密码填写错误', false);

/** 密码格式错误，不能使用此错误码，防止账号被试出 */
// errorCode.SIGNIN_PASSWORD_INVALID = defineCode(3008, '密码填写错误', false);

/** 验证码没填 */
errorCode.SIGNUP_VERIFY_CODE_INVALID = defineCode(3009, '验证码填写错误');

/** 验证码错误 */
errorCode.REGISTER_VERIFY_CODE_WRONG = defineCode(3011, '验证码错误', false);

/** 七牛上传时返回错误 */
errorCode.QINIU_UPLOAD_ERROR = defineCode(3013);

/** 加载七牛上的资源时网络错误 */
errorCode.QINIU_DOWNLOAD_ERROR = defineCode(3014);

/** 向指定号码发送短信过多，达到运营商限制了 */
errorCode.SEND_TOO_MANY_SMS = defineCode(3016, '发送短信次数过多');

/** 短信发送频率过快 */
errorCode.SEND_SMS_TOO_FAST = defineCode(3017, '短信发送频率过快，请${1}秒后再试', false);

/** 数据库访问错误 */
errorCode.ACESS_DATABASE_ERROR = defineCode(3018, '数据库访问错误');

/** 下载文件错误 */
errorCode.DOWNLOAD_FILE_ERROR = defineCode(3024, '下载错误');

/** 数据库还未建立连接 */
errorCode.DATABASE_CONNECTION_NOT_EXIST = defineCode(3026);

/** 创建id时出错 */
errorCode.CREATE_OPENID_ERROR = defineCode(3027);

/** 用户已存在 */
errorCode.USER_HAS_EXISTED = defineCode(3031, '用户已存在');

/** 用户不存在 */
errorCode.USER_NOT_EXIST = defineCode(3032, '用户不存在');

/** 从数据库中查到了出乎意料的数据 */
errorCode.UNEXPECTED_DB_DATA = defineCode(3034);

/** 查询数据库返回空 */
errorCode.FIND_NOTHING_IN_DB = defineCode(3037, '该${1}不存在');

/** 数据不存在或已删除，无法修改 */
errorCode.CANNOT_MODIFY_DELETED_DATA = defineCode(3038, '${1}已删除，无法修改');

/** 没有微信openid */
errorCode.NO_WX_OPENID = defineCode(3043, '请在微信中打开该网页');

/** 手机号格式错误 */
errorCode.INVALID_PHONE = defineCode(3044, '请输入正确的手机号');

/** 数据库中的数据要调用gFilterDocument后再下发到浏览器 */
errorCode.CANNOT_SEND_NATIVE_DATA = defineCode(3046, null, false);

/** 数据库任务队列超时，可能某个任务忘记了回调 */
errorCode.DB_TASK_QUEUE_TIME_OUT = defineCode(3047);

/** node向其它服务器发送post请求失败 */
errorCode.NODE_POST_ERROR = defineCode(3048);

/** 获取token错误 */
errorCode.GET_ACCESS_TOKEN = defineCode(3049, '获取token错误', false);

/** 不具备当前操作权限 */
errorCode.NO_AUTHORITY = defineCode(3050, '不具备当前操作权限');

/** 微信openId未获取 */
errorCode.WX_OPENID_NOT_EXIST = defineCode(3057, '微信openId未获取');

/** 账号未启用 */
errorCode.ACCOUNT_NOT_ENABLE = defineCode(3058, '账号未启用');

/** 微信小程序 登录过期 */
errorCode.MINI_APP_LOGIN_EXPIRED = defineCode(3059, '登录过期');

/** 获取微信 openid 发生错误 */
errorCode.GET_WECHAT_OPENID_ERROR = defineCode(3060, '获取微信 openid 发生错误');

/** 非法的商品ID */
errorCode.INVALID_PRODUCT_ID = defineCode(3061, '非法的商品ID');

/** 定义数据库时使用了保留字，比如type */
errorCode.CANNOT_USE_RESERVED_WORD_IN_DB = defineCode(3065);

/** 请求微信支付订单参数错误 */
errorCode.REQUEST_WX_ORDER_PARAM_ERROR = defineCode(3066, '请求微信支付订单参数错误');

/** 请求微信支付订单网络错误 */
errorCode.REQUEST_WX_ORDER_FAILED = defineCode(3067, '请求微信支付订单网络错误');

/** 校验微信支付订单参数错误 */
errorCode.CHECK_WX_ORDER_PARAM_ERROR = defineCode(3068, '校验微信支付订单参数错误');

/** 微信第三方平台验证票据不存在 */
errorCode.VERIFY_TICKET_NOT_EXIST = defineCode(3069, '微信第三方平台验证票据不存在');

/** 微信第三方平台接口调用凭据不存在 */
errorCode.COMPONET_ACCESS_TOKEN_NOT_EXIST = defineCode(3070, '微信第三方平台接口调用凭据不存在');

exports.errorCode = errorCode;
exports.defineCode = defineCode;