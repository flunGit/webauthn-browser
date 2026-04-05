"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._browserSupportsWebAuthnInternals = void 0;
exports.browserSupportsWebAuthn = browserSupportsWebAuthn;
/**
 * 判断浏览器是否支持 WebAuthn
 */
function browserSupportsWebAuthn() {
    return exports._browserSupportsWebAuthnInternals.stubThis(globalThis?.PublicKeyCredential !== undefined &&
        typeof globalThis.PublicKeyCredential === 'function');
}
/**
 * 使得在测试期间可以模拟返回值
 * @ignore 不要将其包含在文档输出中
 */
exports._browserSupportsWebAuthnInternals = { stubThis: value => value };
