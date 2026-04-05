/**
 * 将给定的数组缓冲区转换为 Base64URL 编码的字符串;适用于将各种凭证响应的 ArrayBuffer
 * 转换为字符串，以便作为 JSON 发送回服务器;
 *
 * 辅助方法，与 `base64URLStringToBuffer` 搭配使用
 */
export function bufferToBase64URLString(buffer) {
    const bytes = new Uint8Array(buffer);
    let str = '';
    for (const charCode of bytes) str += String.fromCharCode(charCode);

    const base64String = btoa(str);
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}