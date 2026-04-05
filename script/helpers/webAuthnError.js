"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAuthnError = void 0;
/**
 * 自定义错误，用于在调用 `navigator.credentials.create()` 或 `navigator.credentials.get()` 后，
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
 * 错误消息通过研究规范确定,以了解在哪些场景下会抛出特定错误;
 */
class WebAuthnError extends Error {
    constructor({ message, code, cause, name, }) {
        // @ts-ignore: help Rollup understand that `cause` is okay to set
        super(message, { cause });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name ?? cause.name;
        this.code = code;
    }
}
exports.WebAuthnError = WebAuthnError;
