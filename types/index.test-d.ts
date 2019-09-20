import Logger from '.'

// Good
const logger = new Logger('', 'trace');
const loggerThree = new Logger('');

// Good
logger.setLevel('info');
logger.setLevel('debug');
logger.setLevel('error');
logger.setLevel('warn');
logger.setLevel('silent');
logger.setLevel('trace');

//Bad
// @ts-ignore
const loggerFour = new Logger();

// Bad
// @ts-ignore
logger.setLevel('log');
