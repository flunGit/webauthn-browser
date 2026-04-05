"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRegistration = startRegistration;
const bufferToBase64URLString_js_1 = require("../helpers/bufferToBase64URLString.js"),
    base64URLStringToBuffer_js_1 = require("../helpers/base64URLStringToBuffer.js"),
    browserSupportsWebAuthn_js_1 = require("../helpers/browserSupportsWebAuthn.js"),
    toPublicKeyCredentialDescriptor_js_1 = require("../helpers/toPublicKeyCredentialDescriptor.js"),
    identifyRegistrationError_js_1 = require("../helpers/identifyRegistrationError.js"),
    webAuthnAbortService_js_1 = require("../helpers/webAuthnAbortService.js"),
    toAuthenticatorAttachment_js_1 = require("../helpers/toAuthenticatorAttachment.js");
/**
 * 通过 WebAuthn 证明开始认证器“注册”
 *
 * @param optionsJSON 来自 **flun-webauthn-server** 的 `generateRegistrationOptions()` 的输出
 * @param useAutoRegister （可选）尝试静默使用用户刚刚登录的密码管理器创建一个通行密钥。默认为 `false`
 */
async function startRegistration(options) {
    // @ts-ignore: 有意检查旧的调用结构，以警告不正确的 API 调用
    if (!options.optionsJSON && options.challenge) {
        console.warn('startRegistration() 的调用方式不正确;将继续尝试使用提供的选项,但应重构此调用以使用预期的调用结构;');
        // @ts-ignore: 将作为位置参数传入的 options 重新赋值给预期的变量
        options = { optionsJSON: options };
    }
    const { optionsJSON, useAutoRegister = false } = options;
    if (!(0, browserSupportsWebAuthn_js_1.browserSupportsWebAuthn)()) throw new Error('此浏览器不支持 WebAuthn');

    // 需要将部分值转换为 Uint8Array 后才能传递给 navigator 的 credentials
    const publicKey = {
        ...optionsJSON,
        challenge: (0, base64URLStringToBuffer_js_1.base64URLStringToBuffer)(optionsJSON.challenge),
        user: {
            ...optionsJSON.user,
            id: (0, base64URLStringToBuffer_js_1.base64URLStringToBuffer)(optionsJSON.user.id)
        },
        excludeCredentials: optionsJSON.excludeCredentials?.map(toPublicKeyCredentialDescriptor_js_1.toPublicKeyCredentialDescriptor)
    }, createOptions = {}; // 准备传递给 `.create()` 的选项
    /**
     * 尝试使用条件创建（conditional create）为用户注册一个通行密钥，
     * 使用用户刚刚用于认证的密码管理器;浏览器不会向用户显示任何突出的 UI;
     * @ts-ignore: `mediation` 在 CredentialCreationOptions 中尚不存在,但自 2024 年 9 月起已可用
     */
    if (useAutoRegister) createOptions.mediation = 'conditional';

    // 最终确定选项
    createOptions.publicKey = publicKey;
    // 设置取消此请求的能力（如果用户尝试另一个请求）
    createOptions.signal = webAuthnAbortService_js_1.WebAuthnAbortService.createNewAbortSignal();
    // 等待用户完成证明
    let credential;
    try {
        credential = (await navigator.credentials.create(createOptions));
    }
    catch (err) {
        throw (0, identifyRegistrationError_js_1.identifyRegistrationError)({ error: err, options: createOptions });
    }
    if (!credential) throw new Error('注册未完成');

    const { id, rawId, response, type } = credential;
    // 暂时继续安全地使用 `getTransports()`,即使 L3 类型声称它是必需的
    let transports = undefined;
    if (typeof response.getTransports === 'function') transports = response.getTransports();

    // L3 声称这是必需的,但浏览器和 WebView 的支持仍不保证
    let responsePublicKeyAlgorithm = undefined;
    if (typeof response.getPublicKeyAlgorithm === 'function') {
        try {
            responsePublicKeyAlgorithm = response.getPublicKeyAlgorithm();
        }
        catch (error) { warnOnBrokenImplementation('getPublicKeyAlgorithm()', error); }
    }
    let responsePublicKey = undefined;
    if (typeof response.getPublicKey === 'function') {
        try {
            const _publicKey = response.getPublicKey();
            if (_publicKey !== null) responsePublicKey = (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(_publicKey);
        }
        catch (error) { warnOnBrokenImplementation('getPublicKey()', error); }
    }
    // L3 声称这是必需的,但浏览器和 WebView 的支持仍不保证
    let responseAuthenticatorData;
    if (typeof response.getAuthenticatorData === 'function') {
        try {
            responseAuthenticatorData = (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.getAuthenticatorData());
        }
        catch (error) { warnOnBrokenImplementation('getAuthenticatorData()', error); }
    }
    return {
        id,
        rawId: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(rawId),
        response: {
            attestationObject: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.attestationObject),
            clientDataJSON: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.clientDataJSON),
            transports,
            publicKeyAlgorithm: responsePublicKeyAlgorithm,
            publicKey: responsePublicKey,
            authenticatorData: responseAuthenticatorData,
        },
        type,
        clientExtensionResults: credential.getClientExtensionResults(),
        authenticatorAttachment: (0, toAuthenticatorAttachment_js_1.toAuthenticatorAttachment)(credential.authenticatorAttachment)
    };
}

/**
 * 当检测到通行密钥提供方拦截 WebAuthn API 调用导致的问题时,发出可见警告
 */
function warnOnBrokenImplementation(methodName, cause) {
    console.warn(`拦截此 WebAuthn API 调用的浏览器扩展错误地实现了 ${methodName};请向该扩展的开发者报告此问题;\n`, cause);
}