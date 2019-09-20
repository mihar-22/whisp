<div align="center">
<h1>Whisp</h1>

> Inspired by [loglevel](https://github.com/pimterry/loglevel)

[![Build Status][build-badge]][build] [![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][package]
[![MIT License][license-badge]][license]
</div>

<p>
Micro, powerful and customizable logger for the browser and node that provides log level mapping to the console.
</p>

- Lightweight. **480b minified and gzipped | 850b minified!**
- No functions wrapping console. **All stack traces are pure!**
- No unnecessary bloat or fancy code. **Only the core functionality!**.
- Use **runners** to asynchronously process logs as they come through.
- Import it or use it directly in the browser. **All file formats are available.**
- Use **templates** to make your output look how you want.
- **SSR** friendly.
- **Types** included.

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Support](#support)
- [Installation](#installation)
- [Introduction](#introduction)
- [Runners](#runners)
  - [Example](#example)
- [Templates](#templates)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Example 3](#example-3)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Support 

***Supports all [Promises](https://caniuse.com/#feat=promises) compliant Browsers and [Node][node] 0.12+.***

If you want to support IE9+ then you'll require a [Promise polyfill](https://www.npmjs.com/package/promise-polyfill).

If you'd like to support older versions of IE (<= 8) or something else ancient, you'll need a polyfill for `Function.prototype.bind` and `Array.prototype.indexOf`

## Installation

`npm install whisp --save-dev` or `yarn add whisp -D`

All formats (umd, cjs and es) and minified versions are available in the dist folder inside the package.

## Introduction 

```js
import Whisp from 'whisp'

// name, level (optional - defaults to "debug"), runners (optional) template (optional), onRunEnd (optional)
const whisp = new Whisp('my-app')

// Log away (info, debug, trace, warn, error or trace)
// `log` is available as an alias to debug
whisp.debug('message.')

// Whisp will not produce output for any log level beneath the specified level.
// The order is: trace, debug (default), info, warn, error, silent
// For example, if the level was set to `warn` then only calls to `warn` and `error` will be displayed in the terminal.
whisp.is('info')
```

## Runners

Callback: `(name, level, ...args) => Promise`

Runners are simple asynchronous callbacks that return a promise. They are passed as an array of callbacks into the constructor. 
You can use them to do anything, for example writing to a file or sending logs to a server.

### Example

```js
import Whisp from 'whisp'

// The `args` argument passed in is an Array of all the arguments you passed into the log call.
// For example if you call `whisp.debug('message1', 'message2')` then args will be `['message1', 'message2']`
const writeToFile = (name, level, ...args) => {
    // Write to file with `fs` and return promise.
}

const pushToServer = (name, level, ...args) => {
    // Push logs to the server with `axios` and return promise.
}

var whisp = new Whisp('my-app', 'debug', [writeToFile, pushToServer])

// You can use `onRunEnd` to be notified of when all the runners promises have resolved or of any rejections.
// The `results` argument passed in is an array of all the results from each runner call.
// This can also be setup through the Whisp `constructor`.
whisp.onRunEnd = (results) => {
  // Do something with results here.
}
```

## Templates

Callback: `(name, level, ...args) => string`

Templates are simple callbacks that modify the style of the logs and return a string.

**Important:** this doesn't affect the runners input, it's only for styling your output.

### Example 1

See [source code](https://github.com/mihar-22/whisp/blob/master/examples/template-1/template-1.js).

<img width="auto" 
   height="auto"
   alt="whisp template 1 preview" 
   src="https://raw.githubusercontent.com/mihar-22/whisp/master/examples/template-1/preview.png">       

### Example 2

See [source code](https://github.com/mihar-22/whisp/blob/master/examples/template-2/template-2.js).

<img width="auto" 
   height="auto"
   alt="whisp template 2 preview" 
   src="https://raw.githubusercontent.com/mihar-22/whisp/master/examples/template-2/preview.png">

### Example 3

See [source code](https://github.com/mihar-22/whisp/blob/master/examples/template-3/template-3.js).

<img width="auto" 
   height="auto"
   alt="whisp template 3 preview" 
   src="https://raw.githubusercontent.com/mihar-22/whisp/master/examples/template-3/preview.png">

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
