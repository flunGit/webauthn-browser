class BaseWebAuthnAbortService {
    constructor() { this.controller = void 0 }

    createNewAbortSignal() {
        // 中止任何现有的 navigator.credentials.create() 或 navigator.credentials.get() 调用
        if (this.controller) {
            const abortError = new Error('取消当前 WebAuthn API 调用,使用新的调用');
            abortError.name = 'AbortError', this.controller.abort(abortError);
        }
        const newController = new AbortController();
        this.controller = newController;
        return newController.signal;
    }

    cancelCeremony() {
        if (this.controller) {
            const abortError = new Error('手动取消现有的 WebAuthn API 调用');
            abortError.name = 'AbortError', this.controller.abort(abortError), this.controller = undefined;
        }
    }
}

/**
 * 服务单例,用于确保同一时间只有一个 WebAuthn 仪式处于活动状态;
 * **flun-webauthn-browser** 的使用者通常不需要使用此服务,但它可以帮助
 * 使用客户端路由的项目开发者更好地控制其用户体验以响应路由导航事件;
 * - 查看定义:@see {@link WebAuthnAbortService}
 */
const WebAuthnAbortService = new BaseWebAuthnAbortService();

export { WebAuthnAbortService };