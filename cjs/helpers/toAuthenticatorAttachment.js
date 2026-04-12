"use strict";

const attachments = ['cross-platform', 'platform'];
/**
 * 如果可能,将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 */
function toAuthenticatorAttachment(attachment) {
    if (!attachment) return;
    if (attachments.indexOf(attachment) < 0) return;
    return attachment;
}

module.exports = { toAuthenticatorAttachment };