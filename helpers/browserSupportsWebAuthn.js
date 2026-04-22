/**
 * 使得在测试期间可以模拟返回值
 * @ignore 不要将其包含在文档输出中
 */
const _browserSupportsWebAuthnInternals = { stubThis: value => value };

/**
 * 判断浏览器是否支持 WebAuthn
 */
const browserSupportsWebAuthn = () => {
    return _browserSupportsWebAuthnInternals.stubThis(globalThis?.PublicKeyCredential !== undefined &&
        typeof globalThis.PublicKeyCredential === 'function');
}

export { _browserSupportsWebAuthnInternals, browserSupportsWebAuthn };