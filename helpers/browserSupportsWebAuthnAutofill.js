import { browserSupportsWebAuthn } from './browserSupportsWebAuthn.js';

/**
 * 使得在测试期间可以模拟返回值
 * - 查看定义:@see {@link  _browserSupportsWebAuthnAutofillInternals}
 * @ignore 不要将其包含在文档输出中
 */
const _browserSupportsWebAuthnAutofillInternals = { stubThis: value => value };

/**
 * 判断浏览器是否支持条件式 UI,以便在浏览器的密码填充弹窗中向用户显示 WebAuthn 凭证;
 * - 查看定义:@see {@link browserSupportsWebAuthnAutofill}
 */
const browserSupportsWebAuthnAutofill = () => {
    if (!browserSupportsWebAuthn())
        return _browserSupportsWebAuthnAutofillInternals.stubThis(Promise.resolve(false));

    // 由于 TypeScript DOM 类型定义尚未包含 isConditionalMediationAvailable，
    // 这里直接通过属性访问进行检测，避免类型断言。
    const globalPublicKeyCredential = globalThis.PublicKeyCredential;
    if (globalPublicKeyCredential?.isConditionalMediationAvailable === undefined)
        return _browserSupportsWebAuthnAutofillInternals.stubThis(Promise.resolve(false));

    return _browserSupportsWebAuthnAutofillInternals.stubThis(
        globalPublicKeyCredential.isConditionalMediationAvailable()
    );
}

export { _browserSupportsWebAuthnAutofillInternals, browserSupportsWebAuthnAutofill };