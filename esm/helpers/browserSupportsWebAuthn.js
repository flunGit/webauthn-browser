/**
 * 判断浏览器是否支持 WebAuthn
 */
export function browserSupportsWebAuthn() {
    return _browserSupportsWebAuthnInternals.stubThis(globalThis?.PublicKeyCredential !== undefined &&
        typeof globalThis.PublicKeyCredential === 'function');
}

/**
 * 使得在测试期间可以模拟返回值
 * @ignore 不要将其包含在文档输出中
 */
export const _browserSupportsWebAuthnInternals = { stubThis: value => value };