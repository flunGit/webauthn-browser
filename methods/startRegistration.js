import {
    bufferToBase64URLString, base64URLStringToBuffer, browserSupportsWebAuthn, identifyRegistrationError,
    toAuthenticatorAttachment, toPublicKeyCredentialDescriptor, WebAuthnAbortService
} from '../helpers/index.js';

/**
 * 通过 WebAuthn 证明开始认证器“注册”
 * - 查看定义:@see {@link startRegistration}
 *
 * @param {Object} options - 配置选项
 * @param {PublicKeyCredentialCreationOptionsJSON} options.optionsJSON - 来自 **@flun/webauthn-server** 的 `generateRegistrationOptions()` 的输出
 * @param {boolean} [options.useAutoRegister] - 尝试静默使用用户刚刚登录的密码管理器创建一个通行密钥,默认为 `false`
 * @returns {Promise<{
 *   id: string,
 *   rawId: string,
 *   response: {
 *     attestationObject: string,
 *     clientDataJSON: string,
 *     transports?: AuthenticatorTransport[],
 *     publicKeyAlgorithm?: COSEAlgorithmIdentifier,
 *     publicKey?: string,
 *     authenticatorData?: string
 *   },
 *   type: PublicKeyCredentialType,
 *   clientExtensionResults: AuthenticationExtensionsClientOutputs,
 *   authenticatorAttachment: AuthenticatorAttachment | null
 * }>}
 */
const startRegistration = async options => {
    // 有意检查旧的调用结构，以警告不正确的 API 调用
    if (!options.optionsJSON && options.challenge) {
        console.warn('startRegistration() 的调用方式不正确；将继续尝试使用提供的选项,但应重构此调用以使用预期的调用结构；');
        options = { optionsJSON: options };  // 将作为位置参数传入的 options 重新赋值给预期的变量
    }

    if (!browserSupportsWebAuthn()) throw new Error('此浏览器不支持 WebAuthn');
    const { optionsJSON, useAutoRegister = false } = options,
        // 需要将部分值转换为 Uint8Array 后才能传递给 navigator 的 credentials
        publicKey = {
            ...optionsJSON,
            challenge: base64URLStringToBuffer(optionsJSON.challenge),
            user: { ...optionsJSON.user, id: base64URLStringToBuffer(optionsJSON.user.id) },
            excludeCredentials: optionsJSON.excludeCredentials?.map(toPublicKeyCredentialDescriptor)
        }, createOptions = {}; // 准备传递给 `.create()` 的选项

    /**
     * 尝试使用条件创建（conditional create）为用户注册一个通行密钥，
     * 使用用户刚刚用于认证的密码管理器；浏览器不会向用户显示任何突出的 UI；
     * 注意：`mediation` 在 CredentialCreationOptions 中尚不存在，但自 2024 年 9 月起已可用
     */
    if (useAutoRegister) createOptions.mediation = 'conditional';

    createOptions.publicKey = publicKey; // 最终确定选项
    createOptions.signal = WebAuthnAbortService.createNewAbortSignal(); // 设置取消此请求的能力（如果用户尝试另一个请求）

    // 等待用户完成证明
    let credential;
    try {
        credential = await navigator.credentials.create(createOptions);
    } catch (err) {
        throw identifyRegistrationError({ error: err, options: createOptions });
    }

    if (!credential) throw new Error('注册未完成');

    const { id, rawId, response, type } = credential;
    // 暂时继续安全地使用 `getTransports()`，即使 L3 类型声称它是必需的
    let transports = void 0;
    if (typeof response.getTransports === 'function') transports = response.getTransports();

    // L3 声称这是必需的，但浏览器和 WebView 的支持仍不保证
    let responsePublicKeyAlgorithm = void 0;
    if (typeof response.getPublicKeyAlgorithm === 'function') {
        try {
            responsePublicKeyAlgorithm = response.getPublicKeyAlgorithm();
        } catch (error) { warnOnBrokenImplementation('getPublicKeyAlgorithm()', error); }
    }

    let responsePublicKey = void 0;
    if (typeof response.getPublicKey === 'function') {
        try {
            const _publicKey = response.getPublicKey();
            if (_publicKey !== null) responsePublicKey = bufferToBase64URLString(_publicKey);
        } catch (error) { warnOnBrokenImplementation('getPublicKey()', error); }
    }

    // L3 声称这是必需的，但浏览器和 WebView 的支持仍不保证
    let responseAuthenticatorData;
    if (typeof response.getAuthenticatorData === 'function') {
        try {
            responseAuthenticatorData = bufferToBase64URLString(response.getAuthenticatorData());
        } catch (error) { warnOnBrokenImplementation('getAuthenticatorData()', error); }
    }

    return {
        id,
        rawId: bufferToBase64URLString(rawId),
        response: {
            attestationObject: bufferToBase64URLString(response.attestationObject),
            clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
            transports,
            publicKeyAlgorithm: responsePublicKeyAlgorithm,
            publicKey: responsePublicKey,
            authenticatorData: responseAuthenticatorData,
        },
        type,
        clientExtensionResults: credential.getClientExtensionResults(),
        authenticatorAttachment: toAuthenticatorAttachment(credential.authenticatorAttachment)
    };
}

/**
 * 当检测到通行密钥提供方拦截 WebAuthn API 调用导致的问题时,发出可见警告
 *
 * @param {string} methodName - 被错误实现的 WebAuthn API 方法名称
 * @param {unknown} cause - 捕获到的原始错误对象
 * @returns {void}
 */
const warnOnBrokenImplementation = (methodName, cause) => {
    console.warn(`拦截此 WebAuthn API 调用的浏览器扩展错误地实现了 ${methodName}；请向该扩展的开发者报告此问题；\n`, cause);
}

export { startRegistration };