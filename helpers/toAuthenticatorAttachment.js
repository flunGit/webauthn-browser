const attachments = ['cross-platform', 'platform'];

/**
 * 尝试将 `string` 值强制转换为已知的 `AuthenticatorAttachment` 类型
 * - 查看定义:@see {@link toAuthenticatorAttachment}
 */
const toAuthenticatorAttachment = attachment => {
    if (!attachment) return;
    if (attachments.indexOf(attachment) < 0) return;
    return attachment;
}

export { toAuthenticatorAttachment };