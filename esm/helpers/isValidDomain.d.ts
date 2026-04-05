/**
 * 一个简单的测试,用于判断主机名是否为格式正确的域名
 *
 * “有效域名”的定义参见：https://url.spec.whatwg.org/#valid-domain
 *
 * 正则表达式最初来源于此处,后经改编以增加 punycode 支持：
 * https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
 */
export declare function isValidDomain(hostname: string): boolean;
//# sourceMappingURL=isValidDomain.d.ts.map