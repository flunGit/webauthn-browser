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
//# sourceMappingURL=webAuthnError.d.ts.map