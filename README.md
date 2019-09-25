<div align="center">
<h1>Whisp</h1>

> Inspired by [loglevel](https://github.com/pimterry/loglevel), [pretty-cli](https://github.com/MichaelCereda/pretty-cli) and [webpack-log](https://github.com/shellscape/webpack-log)

[![Build Status][build-badge]][build] 
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]
</div>

<p>
Micro, powerful and customizable logger for the browser and node that provides log level mapping to the console.
</p>

- Lightweight. **511b minified and compressed with [Brotli](https://github.com/google/brotli)!**
- No functions wrapping console. **All stack traces are pure!**
- No unnecessary bloat or fancy code. **Only the core functionality!**
- Use **workers** to asynchronously process logs as they come through.
- Import it or use it directly in the browser. **All file formats are available.**
- Use **templates** to make your output look how you want it to.
- **SSR** friendly.
- **Types** included.

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Support](#support)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [Workers](#workers)
- [Templates](#templates)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Example 3](#example-3)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Support 

***Supports pretty much all browsers, IE9+ and [Node][node] 0.12+.***

**Important:** if you want to use [Workers](#workers) in IE9+ then you will require a [Promise polyfill](https://www.npmjs.com/package/promise-polyfill).

If you'd like to support older versions of IE (<= 8) or something else ancient, you'll need to consider polyfills 
for `Promise`, `Array.prototype.indexOf` and `Array.prototype.splice`.

## Installation

`npm install whisp --save-dev` or `yarn add whisp -D`

All formats (umd, cjs and es) and minified versions are available in the dist folder inside the package.

## Quickstart 

```js
import Whisp from 'whisp'

// name, level (optional - defaults to "debug")
const whisp = new Whisp('my-app', 'debug')

// Log away (info, debug, trace, warn, error or trace)
// `log` is available as an alias to debug
whisp.debug('message.')

// Get current level
whisp.level()

// Set level
// Whisp will not produce output for any log level beneath the specified level
// The order is: trace, debug (default), info, warn, error, silent
// For example, if the level was set to `warn` then only calls to `warn` and `error` will be displayed in the terminal
whisp.level('error')

// Add workers to process logs
whisp
  .worker('file-worker', (level) => {
    // Write logs to file
  })
  .worker('http-worker', (level) => {
    // Write logs to server
  })
  .worker('slack-worker', (level) => {
    // Send notification to Slack if level meets criteria
  })

// Run a callback when all workers promises have resolved
whisp.onWorkEnd = (results) => {
  // Do something with the results
}

// Run a callback when any of the workers promises have rejected
whisp.onWorkError = (reason) => {
  // Do something with the reason
}

// Add templates to customize output
whisp
  .template('default', (level) => ``)
  .template('title', (level) => ``)
  .template('body', (level) => ``)

// Use your templates
// Note: `default` templates are special in that they are called automatically if set.
whisp
  .debug('message') // Default template is used here if set.
  .debug('template-title', 'message')
  .debug('template-body', 'message')

// Chain calls
whisp
  .template()
  .worker()
  .log()
  .debug()
  .warn()
  .error()
```

## Workers

Callback: `(level, ...args) => Promise`

Workers are simple asynchronous callbacks that return a Promise.
You can use them to do anything, for example writing to a file or sending logs to a server.

```js
import Whisp from 'whisp'

const whisp = new Whisp('my-app')

// Set
// Workers receive all the arguments you passed into the log call
// For example if you call `whisp.debug('message1', 'message2')` then the worker will receive ('debug', 'message1', 'message2')
whisp.worker('name', (level, ...args) => {
  // Do stuff here
})

// Get
whisp.worker('name')

// Run this callback each time all workers are complete
// The `results` argument passed in is an array of all the results from each of the workers resolved promises
whisp.onWorkEnd = (results) => {
  // Do stuff here
}

// Run this callback if any of the workers promises reject
whisp.onWorkError = (reason) => {
  // Do stuff here
}
```

## Templates

Callback: `(level, ...args) => string`

Templates are simple callbacks that modify the style of the logs and return a string.
You can also set a `default` template to be called automatically when no other
template is used.

**Important:** this doesn't affect the workers input, it's only for styling your output.

```js
import Whisp from 'Whisp'

const whisp = new Whisp('my-app')

// Set
whisp.template('name', (level, message1, message2) => {
  // Style and return string
})

// Get
whisp.template('name')

// Use
whisp.debug('template-name', 'message1', 'message2')

// Set default
whisp.template('default', (level, message1, message2) => {
  // Style and return string
})

// Use default
whisp.debug('message1', 'message2')
```

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
[package]: https://www.npmjs.com/package/whisp
[version-badge]: https://img.shields.io/npm/v/whisp
[downloads-badge]: https://img.shields.io/npm/dw/whisp
[license]: https://github.com/mihar-22/whisp/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/whisp?color=b
<!-- prettier-ignore-end -->
