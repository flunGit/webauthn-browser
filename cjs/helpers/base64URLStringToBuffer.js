"use strict";

/**
 * 将 Base64URL 编码的字符串转换为数组缓冲区;
 * 最适合在将凭据 ID 从 JSON 字符串转换为 ArrayBuffer 时使用，
 * 例如在 allowCredentials 或 excludeCredentials 中;
 *
 * 此辅助方法与 `bufferToBase64URLString` 配对使用;
 */
function base64URLStringToBuffer(base64URLString) {
    // 从 Base64URL 转换为标准 Base64
    const base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/'),
        /**
         * 用 '=' 填充，直到长度是 4 的倍数
         * (4 - (85 % 4 = 1) = 3) % 4 = 3 个填充
         * (4 - (86 % 4 = 2) = 2) % 4 = 2 个填充
         * (4 - (87 % 4 = 3) = 1) % 4 = 1 个填充
         * (4 - (88 % 4 = 0) = 4) % 4 = 0 个填充
         */
        padLength = (4 - (base64.length % 4)) % 4, padded = base64.padEnd(base64.length + padLength, '='),
        // 转换为二进制字符串并将二进制字符串转换为缓冲区
        binary = atob(padded), buffer = new ArrayBuffer(binary.length), bytes = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return buffer;
}

module.exports = { base64URLStringToBuffer };