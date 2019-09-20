<div align="center">
<h1>Whisp</h1>

<p>
Micro, powerful and customizable logger for the browser and node that provides log level mapping to the console.
</p>

- Lightweight. **380b minified and gzipped | 620b minified!**
- No functions wrapping console. **All stack traces are pure!**
- No unnecessary bloat or fancy code. **Only the core functionality!**.
- Use **runners** to asynchronously process logs as they come through.
- Import it or use it directly in the browser. **All file formats are available.**
- **Supports** ES5 compliant browsers, IE9+ and Node 0.6+.
- Use **templates** to make it look how you want in the console.
- **SSR** friendly.
- **Types** included.

> Inspired by [loglevel](https://github.com/pimterry/loglevel)

[![Build Status][build-badge]][build] [![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][package]
[![MIT License][license-badge]][license]
</div>
<hr />

## Install 

***Supports any ES5 compliant browser, IE9+ and Node 0.6+.***

If you'd like to support older versions of IE or whatever, you'll need a polyfill for `Function.prototype.bind` and `Array.prototype.indexOf`

`npm install whisp --save-dev` or `yarn add whisp -D`

All formats (umd, cjs and es) and minified versions are available in the dist folder inside the package.

## Usage

```js
import Whisp from 'whisp'

// name, level (optional - defaults to "debug"), runners (optional) template (optional)
const whisp = new Whisp('my-application')

// Log away (info, debug, trace, warn, error or trace)
// `log` is available as an alias to debug
whisp.debug('message.')

// A whisp will not produce output for any log level beneath the specified level.
// The order is: trace, debug (default), info, warn, error, silent
// For example, if the level was set to `warn` then only calls to `warn` and `error` will be displayed in the terminal.
whisp.setLevel('info')
```

## Runners

Array of callbacks passed into the constructor: `(name, level, messages) => void`

Runners are simple asynchronous callbacks that you can use to do anything, pass your logs

## Template

Callback passed into the constructor: `(name, level, messages) => string`

Templates are simple callbacks that modify the style of the logs.

**Important:** this doesn't affect runners, it's only for styling your output.

### Examples

#### Example 1

<div align="center">
![whisp preview](https://raw.githubusercontent.com/mihar-22/whisp/master/examples/template-1/preview.png)
> See [source code](https://github.com/mihar-22/whisp/blob/master/examples/template-1/template-1.js)
</div>

#### Example 2

<div align="center">
![whisp preview](https://raw.githubusercontent.com/mihar-22/whisp/master/examples/template-2/preview.png)
> See [source code](https://github.com/mihar-22/whisp/blob/master/examples/template-2/template-2.js)
</div>

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build]: https://travis-ci.org/mihar-22/whisp
[build-badge]: https://travis-ci.org/mihar-22/whisp.svg?branch=master
[coverage-badge]: https://img.shields.io/codecov/c/github/mihar-22/whisp.svg?style=flat-square
[coverage]: https://codecov.io/github/mihar-22/whisp
[package]: https://www.npmjs.com/package/@mihar-22/whisp
[version-badge]: https://img.shields.io/npm/v/@mihar-22/whisp
[downloads-badge]: https://img.shields.io/npm/dw/@mihar-22/whisp
[license]: https://github.com/mihar-22/whisp/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/whisp?color=b
<!-- prettier-ignore-end -->
