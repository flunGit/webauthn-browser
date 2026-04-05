## 安装

本包可从 **[NPM](https://www.npmjs.com/package/flun-webauthn-browser)**安装：

### Node LTS 20.x 及以上

```sh
npm install flun-webauthn-browser
```

### Deno v1.43 及以上

```sh
deno add jsr:flun-webauthn-browser
```

### UMD

本包也可通过 **unpkg** 安装，只需在页面的 `<head>` 元素中引入以下脚本;库的方法将挂载在全局对象 **`flunWebAuthnBrowser`** 上。

> 注意：以下两个包的唯一区别在于 ES5 版本包含针对旧版浏览器的 polyfill;这会增加一定的包体积，但**能够**在旧版浏览器中使用 `browserSupportsWebAuthn()` 来检测 WebAuthn 是否可用，从而展示合适的 UI。

#### ES2021

如果只需支持现代浏览器，请使用 `ES2021` 版本：

```html
<script src="https://unpkg.com/flun-webauthn-browser/dist/index.js"></script>
```

#### ES5

如果需要在已废弃的浏览器（如 IE11 和 Edge 旧版）中支持 WebAuthn 特性检测，请使用 `ES5` 版本：

```html
<script src="https://unpkg.com/flun-webauthn-browser/dist/index.es5.js"></script>
```