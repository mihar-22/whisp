/**
 * Inspired by / Mostly copy pasted from
 * https://github.com/MichaelCereda/pretty-cli/blob/master/src/templates/basic.js
 */

const Whisp = require('../../dist/whisp.cjs')
const colors = require('colors');

// Not the best code but you get the idea :)
function template(name, level, messages) {
  switch (level) {
    case 'debug':
      return ' D '.bgWhite.black + ` <${name}> ` + messages
    case 'info':
      return ' I '.bgBlue.white + ` <${name}> ` + messages
    case 'error':
      return ' E '.bgRed.white + ` <${name}> ` + messages
    case 'warn':
      return ' W '.bgYellow.black + ` <${name}> ` + messages
    case 'trace':
      return ' T '.bgMagenta.black + ` <${name}> ` + messages
  }
}

const whisp = new Whisp('<example-2>', 'debug', null, template);

whisp.debug('damn.\n');
whisp.info('hmm...\n');
whisp.warn('*!$#*$.\n');
whisp.error('........\n');
