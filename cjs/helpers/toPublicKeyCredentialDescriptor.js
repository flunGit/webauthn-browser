"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPublicKeyCredentialDescriptor = toPublicKeyCredentialDescriptor;
const base64URLStringToBuffer_js_1 = require("./base64URLStringToBuffer.js");
function toPublicKeyCredentialDescriptor(descriptor) {
    const { id } = descriptor;
    return {
        ...descriptor, id: (0, base64URLStringToBuffer_js_1.base64URLStringToBuffer)(id),
        /**
         * `descriptor.transports` 是一个包含较新传输方式的数组,这些传输方式属于我们的 `AuthenticatorTransportFuture` 类型，
         * 而 TypeScript 的 DOM 库对此尚不了解;让 TS 相信我们的传输方式列表可以传递给 WebAuthn,因为浏览器会识别这些新值;
         */
        transports: descriptor.transports,
    };
}
