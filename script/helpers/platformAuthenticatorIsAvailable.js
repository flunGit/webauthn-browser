"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformAuthenticatorIsAvailable = platformAuthenticatorIsAvailable;
const browserSupportsWebAuthn_js_1 = require("./browserSupportsWebAuthn.js");
/**
 * 判断浏览器是否能够与内置身份验证器（如 Touch ID、Android 指纹扫描器或 Windows Hello）通信;
 *
 * 该方法无法告知平台身份验证器的具体名称;
 */
function platformAuthenticatorIsAvailable() {
    if (!(0, browserSupportsWebAuthn_js_1.browserSupportsWebAuthn)()) return new Promise(resolve => resolve(false));
    return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
}
