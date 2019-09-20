/**
 * Inspired by / Mostly copy pasted from
 * https://github.com/MichaelCereda/pretty-cli/blob/master/src/templates/basic.js
 */

const Whisp = require('../../dist/whisp.cjs')
const colors = require('colors');

// Not the best code but you get the idea :)
function template(name, level, messages) {
  let prefix;

  if (level === 'debug') {
    prefix = ' D '.bgWhite.black
  } else if (level === 'info') {
    prefix = ' I '.bgBlue.white
  } else if (level === 'error') {
    prefix = ' E '.bgRed.white
  } else if (level === 'warn') {
    prefix = ' W '.bgYellow.black
  } else if (level === 'trace') {
    prefix = ' T '.bgMagenta.black
  }

  return prefix + ` ${name} `.bold + messages
}

const whisp = new Whisp('<example-2>', 'debug', null, template);

whisp.debug('damn.\n');
whisp.info('hmm...\n');
whisp.warn('*!$#*$.\n');
whisp.error('........\n');
