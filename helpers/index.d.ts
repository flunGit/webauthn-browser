import { base64URLStringToBuffer, bufferToBase64URLString } from './base64urlAndBuffer.js';
import { _browserSupportsWebAuthnInternals, browserSupportsWebAuthn } from './browserSupportsWebAuthn.js';
import { _browserSupportsWebAuthnAutofillInternals, browserSupportsWebAuthnAutofill } from './browserSupportsWebAuthnAutofill.js';
import { identifyAuthenticationError } from './identifyAuthenticationError.js';
import { identifyRegistrationError } from './identifyRegistrationError.js';
import { isValidDomain } from './isValidDomain.js';
import { platformAuthenticatorIsAvailable } from './platformAuthenticatorIsAvailable.js';
import { toAuthenticatorAttachment } from './toAuthenticatorAttachment.js';
import { toPublicKeyCredentialDescriptor } from './toPublicKeyCredentialDescriptor.js';
import { WebAuthnAbortService } from './WebAuthnAbortService.js';
import { WebAuthnError } from './webAuthnError.js';

// ================================ base64urlAndBuffer.js ================================
/**
 * ```js
 * // 文件导出内容
 * base64URLStringToBuffer(); // 将 Base64URL 编码的字符串转换为 Array Buffer;
 * bufferToBase64URLString(); // 将给定的数组缓冲区转换为 Base64URL 编码的字符串;
 * ```
 * - 查看定义:@see {@link base64URLStringToBuffer}、{@link bufferToBase64URLString}
 */
declare module './base64urlAndBuffer.js' {
    export * from './base64urlAndBuffer.js';
}

// ================================ browserSupportsWebAuthn.js ================================
/**
 * ```js
 * // 文件导出内容
 * const _browserSupportsWebAuthnInternals={}; // 测试期间对返回值进行桩（stub）处理
 * browserSupportsWebAuthn();                  // 判断当前浏览器是否支持 WebAuthn
 * ```
 * - 查看定义:@see {@link _browserSupportsWebAuthnInternals}、{@link browserSupportsWebAuthn}
 */
declare module './browserSupportsWebAuthn.js' {
    export * from './browserSupportsWebAuthn.js';
}

// ================================ browserSupportsWebAuthnAutofill.js ================================
/**
 * ```js
 * // 文件导出内容
 * const _browserSupportsWebAuthnAutofillInternals={}; // 测试期间模拟返回值;
 * browserSupportsWebAuthnAutofill();                  // 判断浏览器是否支持条件式UI;
 * ```
 * - 查看定义:@see {@link  _browserSupportsWebAuthnAutofillInternals}、{@link browserSupportsWebAuthnAutofill}
 */
declare module './browserSupportsWebAuthnAutofill.js' {
    export * from './browserSupportsWebAuthnAutofill.js';
}

// ================================ identifyAuthenticationError.js ================================
/**
 * ```js
 * // 文件导出内容
 * identifyAuthenticationError(); // 尝试推断调用 `navigator.credentials.get()` 后引发错误的原因;
 * ```
 * - 查看定义:@see {@link identifyAuthenticationError}
 */
declare module './identifyAuthenticationError.js' {
    export * from './identifyAuthenticationError.js';
}

// ================================ identifyRegistrationError.js ================================
/**
 * ```js
 * // 文件导出内容
 * identifyRegistrationError(); // 尝试推断调用 `navigator.credentials.create()` 后引发错误的原因;
 * ```
 * - 查看定义:@see {@link identifyRegistrationError}
 */
declare module './identifyRegistrationError.js' {
    export * from './identifyRegistrationError.js';
}

// ================================ isValidDomain.js ================================
/**
 * ```js
 * // 文件导出内容
 * isValidDomain(); // 判断主机域名格式是否正确;
 * ```
 * - 查看定义:@see {@link isValidDomain}
 */
declare module './isValidDomain.js' {
    export * from './isValidDomain.js';
}

// ================================ platformAuthenticatorIsAvailable.js ================================
/**
 * ```js
 * // 文件导出内容
 * platformAuthenticatorIsAvailable(); // 判断浏览器是否能够与内置身份验证器通信;
 * ```
 * - 查看定义:@see {@link platformAuthenticatorIsAvailable}
 */
declare module './platformAuthenticatorIsAvailable.js' {
    export * from './platformAuthenticatorIsAvailable.js';
}

// ================================ toAuthenticatorAttachment.js ================================
/**
 * ```js
 * // 文件导出内容
 * toAuthenticatorAttachment(); // 尝试将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 * ```
 * - 查看定义:@see {@link toAuthenticatorAttachment}
 */
declare module './toAuthenticatorAttachment.js' {
    export * from './toAuthenticatorAttachment.js';
}

// ================================ toPublicKeyCredentialDescriptor.js ================================
/**
 * ```js
 * // 文件导出内容
 * toPublicKeyCredentialDescriptor(); // 将描述符中的 Base64URL 字符串 `id` 转换为 ArrayBuffer,以适配 WebAuthn API;
 * ```
 * - 查看定义:@see {@link toPublicKeyCredentialDescriptor}
 */
declare module './toPublicKeyCredentialDescriptor.js' {
    export * from './toPublicKeyCredentialDescriptor.js';
}

// ================================ webAuthnAbortService.js ================================
/**
 * ```js
 * // 文件导出内容
 * const WebAuthnAbortService = new BaseWebAuthnAbortService(); // 服务单例,用于确保同一时间只有一个 WebAuthn 仪式处于活动状态;
 * ```
 * - 查看定义:@see {@link WebAuthnAbortService}
 */
declare module './webAuthnAbortService.js' {
    export * from './webAuthnAbortService.js';
}

// ================================ webAuthnError.js ================================
/**
 * ```js
 * // 文件导出内容
 * class WebAuthnError{}; // 自定义错误,用于更细致地说明规范中八种错误被抛出的原因;
 * ```
 * - 查看定义:@see {@link WebAuthnError}
 */
declare module './webAuthnError.js' {
    export type WebAuthnErrorCode =
        | 'ERROR_CEREMONY_ABORTED' | 'ERROR_INVALID_DOMAIN' | 'ERROR_INVALID_RP_ID' | 'ERROR_INVALID_USER_ID_LENGTH'
        | 'ERROR_MALFORMED_PUBKEYCREDPARAMS' | 'ERROR_AUTHENTICATOR_GENERAL_ERROR'
        | 'ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT'
        | 'ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT'
        | 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED' | 'ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG'
        | 'ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE' | 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY';
    export * from './webAuthnError.js';
}

/**
 * 模块导出内容：
 * ```js
 * // 类型
 * type WebAuthnErrorCode;
 *
 * // 常量
 * const _browserSupportsWebAuthnInternals={};         // 测试期间对返回值进行桩（stub）处理
 * const _browserSupportsWebAuthnAutofillInternals={}; // 测试期间模拟返回值;
 * const WebAuthnAbortService = new BaseWebAuthnAbortService(); // 服务单例,用于确保同一时间只有一个 WebAuthn 仪式处于活动状态;
 *
 * // 函数
 * base64URLStringToBuffer();                          // 将 Base64URL 编码的字符串转换为 Array Buffer;
 * bufferToBase64URLString();                          // 将给定的数组缓冲区转换为 Base64URL 编码的字符串;
 * browserSupportsWebAuthn();                          // 判断当前浏览器是否支持 WebAuthn
 * browserSupportsWebAuthnAutofill();                  // 判断浏览器是否支持条件式UI;
 * identifyAuthenticationError();                      // 尝试推断调用 `navigator.credentials.get()` 后引发错误的原因;
 * identifyRegistrationError();                        // 尝试推断调用 `navigator.credentials.create()` 后引发错误的原因;
 * isValidDomain();                                    // 判断主机域名格式是否正确;
 * platformAuthenticatorIsAvailable();                 // 判断浏览器是否能够与内置身份验证器通信;
 * toAuthenticatorAttachment();                        // 尝试将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 * toPublicKeyCredentialDescriptor();                  // 将描述符中的Base64URL字符串`id`转换为ArrayBuffer,以适配 WebAuthn API;
 *
 * // 类
 * class WebAuthnError{};                              // 自定义错误,用于更细致地说明规范中八种错误被抛出的原因;
 * ```
 * - 查看定义:@see
 * - 类型 {@link WebAuthnErrorCode}
 * - 常量 {@link _browserSupportsWebAuthnInternals}、{@link _browserSupportsWebAuthnAutofillInternals}、{@link WebAuthnAbortService}
 * - 函数 {@link base64URLStringToBuffer}、{@link bufferToBase64URLString}、 {@link browserSupportsWebAuthn}、
 * {@link browserSupportsWebAuthnAutofill}、{@link identifyAuthenticationError}、{@link identifyRegistrationError}、
 * {@link isValidDomain}、{@link platformAuthenticatorIsAvailable}、{@link toAuthenticatorAttachment}、
 * {@link toPublicKeyCredentialDescriptor}
 * - 类 {@link WebAuthnError}
 */
declare module './index.js' {
    export * from './base64urlAndBuffer.js';
    export * from './browserSupportsWebAuthn.js';
    export * from './browserSupportsWebAuthnAutofill.js';
    export * from './identifyAuthenticationError.js';
    export * from './identifyRegistrationError.js';
    export * from './isValidDomain.js';
    export * from './platformAuthenticatorIsAvailable.js';
    export * from './toAuthenticatorAttachment.js';
    export * from './toPublicKeyCredentialDescriptor.js';
    export * from './WebAuthnAbortService.js';
    export * from './WebAuthnError.js';
}