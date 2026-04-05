"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAuthentication = startAuthentication;
const bufferToBase64URLString_js_1 = require("../helpers/bufferToBase64URLString.js"),
    base64URLStringToBuffer_js_1 = require("../helpers/base64URLStringToBuffer.js"),
    browserSupportsWebAuthn_js_1 = require("../helpers/browserSupportsWebAuthn.js"),
    browserSupportsWebAuthnAutofill_js_1 = require("../helpers/browserSupportsWebAuthnAutofill.js"),
    toPublicKeyCredentialDescriptor_js_1 = require("../helpers/toPublicKeyCredentialDescriptor.js"),
    identifyAuthenticationError_js_1 = require("../helpers/identifyAuthenticationError.js"),
    webAuthnAbortService_js_1 = require("../helpers/webAuthnAbortService.js"),
    toAuthenticatorAttachment_js_1 = require("../helpers/toAuthenticatorAttachment.js");
/**
 * 通过 WebAuthn 断言开始身份验证器“登录”
 *
 * @param optionsJSON 来自 **@simplewebauthn/server** 的 `generateAuthenticationOptions()` 的输出
 * @param useBrowserAutofill （可选）初始化条件式 UI，以支持通过浏览器自动填充提示进行登录。默认为 `false`;
 * @param verifyBrowserAutofillInput （可选）当 `useBrowserAutofill` 为 `true` 时,确保存在合适的 `<input>` 元素;默认为 `true`;
 */
async function startAuthentication(options) {
    // @ts-ignore: 有意检查旧的调用结构，以警告不正确的 API 调用
    if (!options.optionsJSON && options.challenge) {
        console.warn("startAuthentication() 调用方式不正确;它将尝试使用提供的选项继续执行,但应重构此调用以使用预期的调用结构;");
        // @ts-ignore: 将作为位置参数传入的 options 重新赋值给预期变量
        options = { optionsJSON: options };
    }

    const { optionsJSON, useBrowserAutofill = false, verifyBrowserAutofillInput = true, } = options;

    if (!(0, browserSupportsWebAuthn_js_1.browserSupportsWebAuthn)()) throw new Error('此浏览器不支持 WebAuthn');
    // 需要避免传递空数组，以免阻止公钥的检索
    let allowCredentials;
    if (optionsJSON.allowCredentials?.length !== 0)
        allowCredentials = optionsJSON.allowCredentials?.map(toPublicKeyCredentialDescriptor_js_1.toPublicKeyCredentialDescriptor);

    // 在将凭证传递给 navigator 之前,需要将某些值转换为 Uint8Array
    const publicKey = {
        ...optionsJSON,
        challenge: (0, base64URLStringToBuffer_js_1.base64URLStringToBuffer)(optionsJSON.challenge),
        allowCredentials,
    }, getOptions = {};// 为 `.get()` 准备选项

    /**
     * 设置页面,通过浏览器的输入自动填充机制提示用户选择用于身份验证的凭证;
     */
    if (useBrowserAutofill) {
        if (!(await (0, browserSupportsWebAuthnAutofill_js_1.browserSupportsWebAuthnAutofill)()))
            throw Error('浏览器不支持 WebAuthn 自动填充');

        // 检查是否存在 `autocomplete` 属性中包含 "webauthn" 的 <input>
        const eligibleInputs = document.querySelectorAll("input[autocomplete$='webauthn']");

        // WebAuthn 自动填充要求至少有一个有效的输入框
        if (eligibleInputs.length < 1 && verifyBrowserAutofillInput)
            throw Error('未检测到任何 `autocomplete` 属性中包含 "webauthn"（作为唯一值或最后一个值）的 <input> 元素');

        // 截至 typescript@4.6.3，`CredentialMediationRequirement` 尚不识别 "conditional"
        getOptions.mediation = 'conditional', publicKey.allowCredentials = []; // 条件式 UI 要求 allowCredentials 为空列表
    }

    // 最终确定选项
    getOptions.publicKey = publicKey;

    // 设置取消此请求的能力,以防用户尝试另一个请求
    getOptions.signal = webAuthnAbortService_js_1.WebAuthnAbortService.createNewAbortSignal();

    // 等待用户完成断言
    let credential;
    try {
        credential = (await navigator.credentials.get(getOptions));
    } catch (err) {
        throw (0, identifyAuthenticationError_js_1.identifyAuthenticationError)({ error: err, options: getOptions });
    }

    if (!credential) throw new Error('身份验证未完成');
    const { id, rawId, response, type } = credential;
    let userHandle = undefined;
    if (response.userHandle) userHandle = (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.userHandle);

    // 将值转换为 base64，以便更容易发送回服务器
    return {
        id,
        rawId: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(rawId),
        response: {
            authenticatorData: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.authenticatorData),
            clientDataJSON: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.clientDataJSON),
            signature: (0, bufferToBase64URLString_js_1.bufferToBase64URLString)(response.signature),
            userHandle,
        },
        type,
        clientExtensionResults: credential.getClientExtensionResults(),
        authenticatorAttachment: (0, toAuthenticatorAttachment_js_1.toAuthenticatorAttachment)(credential.authenticatorAttachment),
    };
}
