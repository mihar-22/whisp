const Logger = require('../../dist/logger.cjs')

const COLOR_BOLD = [1, 22];
const COLOR_BLUE = [34, 39];
const COLOR_CYAN = [36, 39];
const COLOR_RED = [31, 39];
const COLOR_YELLOW = [33, 39];
const COLOR_MAGENTA = [35, 39];
const COLOR_RESET = [0, 0];

const SYMBOL_WHOOPS = "⬢";
const SYMBOL_OK = "⬡";

const theme = {
  trace: COLOR_MAGENTA,
  debug: COLOR_CYAN,
  info: COLOR_BLUE,
  warn: COLOR_YELLOW,
  error: COLOR_RED,
  silent: COLOR_RESET,
};

function color(text, code) {
  return `\u001b[${code[0]}m${text}\u001b[${code[1]}m`;
}

function template(name, level, messages) {
  const time = new Date().toTimeString().split(" ")[0];
  const symbol = (level === 'error' || level === 'warn') ? SYMBOL_WHOOPS : SYMBOL_OK

  return [
    color(`[${time}] `, theme[level]),
    color(`${color(symbol, COLOR_BOLD)} ${color(name, COLOR_BOLD)} `, theme[level]),
    messages
  ].join('')
}

const logger = new Logger('<example-1>', 'debug', null, template);

logger.debug('damn.');
logger.info('hmm...');
logger.warn('*!$#*$.');
logger.error('........');
