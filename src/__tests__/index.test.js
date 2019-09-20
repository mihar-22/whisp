import Logger, { SYMBOL_WHOOPS } from '..'

describe('`logger utility`', () => {
  const NAME = '<test>'

  let logger

  beforeEach(() => {
    global.console = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      trace: jest.fn()
    }

    logger = new Logger(NAME)
  })

  test('should log whoops symbol, name and message given `warn` or `error` log level', () => {
    const message = 'message'
    logger.warn(message)
    logger.error(message)

    const expectedMessage = `${SYMBOL_WHOOPS} ${NAME} ${message}`
    expect(global.console.warn).toHaveBeenCalledWith(expectedMessage).toHaveBeenCalledTimes(1)
    expect(global.console.error).toHaveBeenCalledTimes(1)
  })

  test('should log ok symbol, name and message given `info`, `debug` or `trace` log level', () => {
    const message = 'message'
    logger.setLevel('trace')
    logger.trace(message)
    logger.debug(message)
    logger.info(message)

    const expectedMessage = `${Symbol.OK} ${logger.name} ${message}`
    expect(global.console.trace).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.info).toHaveBeenCalledTimes(1)
  })
})
