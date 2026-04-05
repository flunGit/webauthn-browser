const attachments = ['cross-platform', 'platform'];

/**
 * 如果可能,将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 */
export function toAuthenticatorAttachment(attachment) {
    if (!attachment) return;
    if (attachments.indexOf(attachment) < 0) return;
    return attachment;
}