import { WebAuthnError } from './webAuthnError.js';

/**
 * 尝试推断调用 `navigator.credentials.create()` 后引发错误的原因
 */
export declare function identifyRegistrationError({ error, options, }: {
    error: Error, options: CredentialCreationOptions;
}): WebAuthnError | Error;
//# sourceMappingURL=identifyRegistrationError.d.ts.map