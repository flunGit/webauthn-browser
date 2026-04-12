"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDomain = isValidDomain;
/**
 * 一个简单的测试，用于判断主机名是否为格式正确的域名
 *
 * “有效域名”的定义参见：https://url.spec.whatwg.org/#valid-domain
 *
 * 正则表达式最初来源于此处,后经改编以增加 punycode 支持：
 * https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
 */
function isValidDomain(hostname) {
    return (
        // 将 localhost 视为有效,因为它在安全上下文方面是没问题的,支持 punycode (ACE) 或 ASCII 标签和域名
        hostname === 'localhost' || /^((xn--[a-z0-9-]+|[a-z0-9]+(-[a-z0-9]+)*)\.)+([a-z]{2,}|xn--[a-z0-9-]+)$/i.test(hostname));
}
