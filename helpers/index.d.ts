import type { AuthenticatorAttachment, PublicKeyCredentialDescriptor, PublicKeyCredentialDescriptorJSON } from '../types/index.js';
import { base64URLStringToBuffer } from './base64URLStringToBuffer.js';
import { _browserSupportsWebAuthnInternals, browserSupportsWebAuthn } from './browserSupportsWebAuthn.js';
import { _browserSupportsWebAuthnAutofillInternals, browserSupportsWebAuthnAutofill } from './browserSupportsWebAuthnAutofill.js';
import { bufferToBase64URLString } from './bufferToBase64URLString.js';
import { identifyAuthenticationError } from './identifyAuthenticationError.js';
import { identifyRegistrationError } from './identifyRegistrationError.js';
import { isValidDomain } from './isValidDomain.js';
import { platformAuthenticatorIsAvailable } from './platformAuthenticatorIsAvailable.js';
import { toAuthenticatorAttachment } from './toAuthenticatorAttachment.js';
import { toPublicKeyCredentialDescriptor } from './toPublicKeyCredentialDescriptor.js';
import { WebAuthnAbortService } from './WebAuthnAbortService.js';
import { WebAuthnError } from './webAuthnError.js';

// ================================ base64URLStringToBuffer.js ================================
/**
 * 将 Base64URL 编码的字符串转换为 Array Buffer;最适合在将凭证 ID 从 JSON 字符串转换为 ArrayBuffer 时使用，
 * 例如在 allowCredentials 或 excludeCredentials 中;
 *
 * 与 `bufferToBase64URLString` 配合使用的辅助方法
 */
export declare function base64URLStringToBuffer(base64URLString: string): ArrayBuffer;

// ================================ browserSupportsWebAuthn.js ================================
/**
 * 判断当前浏览器是否支持 WebAuthn
 */
export declare function browserSupportsWebAuthn(): boolean;

/**
 * 允许在测试期间对返回值进行桩（stub）处理
 * @ignore 不要将此内容包含在文档输出中
 */
export declare const _browserSupportsWebAuthnInternals: {
    stubThis: (value: boolean) => boolean;
};

// ================================ browserSupportsWebAuthnAutofill.js ================================
/**
 * 判断浏览器是否支持条件式UI,以便可以在浏览器典型的密码自动填充弹出窗口中向用户显示WebAuthn凭证;
 */
export declare function browserSupportsWebAuthnAutofill(): Promise<boolean>;

export declare const _browserSupportsWebAuthnAutofillInternals: {
    stubThis: (value: Promise<boolean>) => Promise<boolean>;
};

// ================================ bufferToBase64URLString.js ================================
/**
 * 将给定的数组缓冲区转换为 Base64URL 编码的字符串。适用于将各种凭证响应的 ArrayBuffer
 * 转换为字符串，以便作为 JSON 发送回服务器。
 *
 * 辅助方法，与 `base64URLStringToBuffer` 搭配使用
 */
export declare function bufferToBase64URLString(buffer: ArrayBuffer): string;

// ================================ identifyAuthenticationError.js ================================
/**
 * 尝试推断调用 `navigator.credentials.get()` 后引发错误的原因
 */
export declare function identifyAuthenticationError({ error, options, }: {
    error: Error, options: CredentialRequestOptions;
}): WebAuthnError | Error;

// ================================ identifyRegistrationError.js ================================
/**
 * 尝试推断调用 `navigator.credentials.create()` 后引发错误的原因
 */
export declare function identifyRegistrationError({ error, options, }: {
    error: Error, options: CredentialCreationOptions;
}): WebAuthnError | Error;

// ================================ isValidDomain.js ================================
/**
 * 一个简单的测试,用于判断主机名是否为格式正确的域名
 *
 * “有效域名”的定义参见：https://url.spec.whatwg.org/#valid-domain
 *
 * 正则表达式最初来源于此处,后经改编以增加 punycode 支持：
 * https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
 */
export declare function isValidDomain(hostname: string): boolean;

// ================================ platformAuthenticatorIsAvailable.js ================================
/**
 * 判断浏览器是否能够与内置身份验证器（如 Touch ID、Android 指纹扫描器或 Windows Hello）通信。
 *
 * 该方法无法告知平台身份验证器的具体名称。
 */
export declare function platformAuthenticatorIsAvailable(): Promise<boolean>;

// ================================ toAuthenticatorAttachment.js ================================
/**
 * 如果可能,将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 */
export declare function toAuthenticatorAttachment(attachment: string | null): AuthenticatorAttachment | undefined;

// ================================ toPublicKeyCredentialDescriptor.js ================================
/**
 * 将描述符中的 Base64URL 字符串 `id` 转换为 ArrayBuffer，以适配 WebAuthn API。
 * @param {Object} descriptor - 包含 `id` (Base64URL 字符串) 的凭证描述符。
 * @param {string} descriptor.id
 * @returns {PublicKeyCredentialDescriptor} 转换后的描述符，可直接用于 WebAuthn。
 */
export declare function toPublicKeyCredentialDescriptor(descriptor: PublicKeyCredentialDescriptorJSON):
    PublicKeyCredentialDescriptor;

// ================================ webAuthnAbortService.js ================================
interface WebAuthnAbortService {
    /**
     * 准备一个中止信号,用于支持多次身份验证尝试而无需重新加载页面;
     * 每当调用 `startRegistration()` 和 `startAuthentication()` 时会自动调用此方法;
     */
    createNewAbortSignal(): AbortSignal;
    /**
     * 手动取消任何正在进行的 WebAuthn 注册或身份验证尝试;
     */
    cancelCeremony(): void;
}

/**
 * 服务单例,用于帮助确保同一时间只有一个 WebAuthn 仪式处于活动状态;
 *
 * **flun-webauthn-browser** 的使用者通常不需要使用此服务,但它可以帮助例如
 * 使用客户端路由的项目开发者更好地控制其用户体验以响应路由导航事件;
 */
export declare const WebAuthnAbortService: WebAuthnAbortService;
export { };

// ================================ WebAuthnError.js ================================
/**
 * 自定义错误,用于在调用 `navigator.credentials.create()` 或 `navigator.credentials.get()` 后,
 * 更细致地说明规范中描述的八种错误之一被抛出的原因：
 *
 * - `AbortError`
 * - `ConstraintError`
 * - `InvalidStateError`
 * - `NotAllowedError`
 * - `NotSupportedError`
 * - `SecurityError`
 * - `TypeError`
 * - `UnknownError`
 *
 * 错误消息通过研究规范确定,以了解在哪些场景下会抛出特定错误。
 */
export declare class WebAuthnError extends Error {
    code: WebAuthnErrorCode;
    constructor({ message, code, cause, name, }: { message: string, code: WebAuthnErrorCode, cause: Error, name?: string; });
}

export type WebAuthnErrorCode =
    | 'ERROR_CEREMONY_ABORTED' | 'ERROR_INVALID_DOMAIN' | 'ERROR_INVALID_RP_ID' | 'ERROR_INVALID_USER_ID_LENGTH'
    | 'ERROR_MALFORMED_PUBKEYCREDPARAMS' | 'ERROR_AUTHENTICATOR_GENERAL_ERROR'
    | 'ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT' | 'ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT'
    | 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED' | 'ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG'
    | 'ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE' | 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY';

/**
 *
 * 验证器认证处理模块函数：
 * ```js
 * generateAuthenticationOptions(); // 生成用于身份验证器认证的参数
 * verifyAuthenticationResponse();  // 验证用户是否合法完成了认证流程
 * ```
 * - 查看定义:@see {@link generateAuthenticationOptions}、{@link verifyAuthenticationResponse}
 */
declare module './index.js' {
    export * from './base64URLStringToBuffer.js';
    export * from './browserSupportsWebAuthn.js';
    export * from './browserSupportsWebAuthnAutofill.js';
    export * from './bufferToBase64URLString.js';
    export * from './identifyAuthenticationError.js';
    export * from './identifyRegistrationError.js';
    export * from './isValidDomain.js';
    export * from './platformAuthenticatorIsAvailable.js';
    export * from './toAuthenticatorAttachment.js';
    export * from './toPublicKeyCredentialDescriptor.js';
    export * from './WebAuthnAbortService.js';
    export * from './WebAuthnError.js';
}