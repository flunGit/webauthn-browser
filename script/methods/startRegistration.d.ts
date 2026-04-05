import type { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from '../types/index.js';
export type StartRegistrationOpts = Parameters<typeof startRegistration>[0];

/**
 * 通过 WebAuthn 证明开始认证器“注册”
 *
 * @param optionsJSON 来自 **flun-webauthn-server** 的 `generateRegistrationOptions()` 的输出
 * @param useAutoRegister （可选）尝试静默使用用户刚刚登录的密码管理器创建一个通行密钥。默认为 `false`
 */
export declare function startRegistration(options: {
    optionsJSON: PublicKeyCredentialCreationOptionsJSON;
    useAutoRegister?: boolean;
}): Promise<RegistrationResponseJSON>;

//# sourceMappingURL=startRegistration.d.ts.map