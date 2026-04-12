"use strict";

Object.assign(
    exports,
    require("./methods/startRegistration.js"),
    require("./methods/startAuthentication.js"),
    require("./helpers/browserSupportsWebAuthn.js"),
    require("./helpers/platformAuthenticatorIsAvailable.js"),
    require("./helpers/browserSupportsWebAuthnAutofill.js"),
    require("./helpers/base64URLStringToBuffer.js"),
    require("./helpers/bufferToBase64URLString.js"),
    require("./helpers/webAuthnAbortService.js"),
    require("./helpers/webAuthnError.js")
);