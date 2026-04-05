/**
 * 将 Base64URL 编码的字符串转换为数组缓冲区。
 * 最适合在将凭据 ID 从 JSON 字符串转换为 ArrayBuffer 时使用，
 * 例如在 allowCredentials 或 excludeCredentials 中。
 *
 * 此辅助方法与 `bufferToBase64URLString` 配对使用。
 */
export declare function base64URLStringToBuffer(base64URLString: string): ArrayBuffer;
//# sourceMappingURL=base64URLStringToBuffer.d.ts.map