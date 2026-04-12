/**
 * 判断浏览器是否支持条件式UI,以便可以在浏览器典型的密码自动填充弹出窗口中向用户显示WebAuthn凭证;
 */
export declare function browserSupportsWebAuthnAutofill(): Promise<boolean>;

export declare const _browserSupportsWebAuthnAutofillInternals: {
    stubThis: (value: Promise<boolean>) => Promise<boolean>;
};
//# sourceMappingURL=browserSupportsWebAuthnAutofill.d.ts.map