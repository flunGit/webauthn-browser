import { browserSupportsWebAuthn } from './browserSupportsWebAuthn.js';

/**
 * 判断浏览器是否支持条件式 UI，以便可以在浏览器典型的密码自动填充弹出窗口中
 * 向用户显示 WebAuthn 凭证。
 */
export function browserSupportsWebAuthnAutofill() {
    if (!browserSupportsWebAuthn())
        return _browserSupportsWebAuthnAutofillInternals.stubThis(new Promise(resolve => resolve(false)));

    /**
     * 我不喜欢这里使用 `as unknown`，但由于 TS 的 DOM 库中存在一个 `declare var PublicKeyCredential`，
     * 导致我无法直接像期望的那样使用 `as PublicKeyCredentialFuture`;目前这样写我觉得可以接受，
     * 因为它本应是临时方案,直到 TS 类型能够跟上;
     */
    const globalPublicKeyCredential = globalThis.PublicKeyCredential;

    if (globalPublicKeyCredential?.isConditionalMediationAvailable === undefined)
        return _browserSupportsWebAuthnAutofillInternals.stubThis(new Promise((resolve) => resolve(false)));

    return _browserSupportsWebAuthnAutofillInternals.stubThis(globalPublicKeyCredential.isConditionalMediationAvailable());
}

// 使得在测试期间可以模拟返回值
export const _browserSupportsWebAuthnAutofillInternals = { stubThis: value => value };