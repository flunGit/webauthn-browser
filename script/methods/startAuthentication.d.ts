import type { AuthenticationResponseJSON, PublicKeyCredentialRequestOptionsJSON } from '../types/index.js';

export type StartAuthenticationOpts = Parameters<typeof startAuthentication>[0];

/**
 * 通过 WebAuthn 断言开始身份验证器“登录”
 *
 * @param optionsJSON 来自 **flun-webauthn-server** 的 `generateAuthenticationOptions()` 的输出
 * @param useBrowserAutofill （可选）初始化条件式 UI,以支持通过浏览器自动填充提示进行登录;默认为 `false`。
 * @param verifyBrowserAutofillInput （可选）当 `useBrowserAutofill` 为 `true` 时，确保存在合适的 `<input>` 元素;默认为 `true`;
 */
export declare function startAuthentication(options: {
    optionsJSON: PublicKeyCredentialRequestOptionsJSON;
    useBrowserAutofill?: boolean, verifyBrowserAutofillInput?: boolean;
}): Promise<AuthenticationResponseJSON>;
//# sourceMappingURL=startAuthentication.d.ts.map