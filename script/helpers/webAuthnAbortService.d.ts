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
//# sourceMappingURL=webAuthnAbortService.d.ts.map