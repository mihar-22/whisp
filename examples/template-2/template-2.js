const Logger = require('../../dist/logger.cjs')
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

const logger = new Logger('<example-2>', 'debug', null, template);

logger.debug('damn.\n');
logger.info('hmm...\n');
logger.warn('*!$#*$.\n');
logger.error('........\n');
