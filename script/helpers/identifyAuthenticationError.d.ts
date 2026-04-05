import { WebAuthnError } from './webAuthnError.js';

/**
 * 尝试推断调用 `navigator.credentials.get()` 后引发错误的原因
 */
export declare function identifyAuthenticationError({ error, options, }: {
    error: Error, options: CredentialRequestOptions;
}): WebAuthnError | Error;
//# sourceMappingURL=identifyAuthenticationError.d.ts.map