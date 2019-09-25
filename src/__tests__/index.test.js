/* eslint-env jest */

const Whisp = require('../')

describe('`Whisp`', () => {
  const NAME = '<test>'
  const MESSAGE = 'message'

  let whisp

  const log = () => {
    whisp.trace(MESSAGE)
      .debug(MESSAGE)
      .info(MESSAGE)
      .warn(MESSAGE)
      .error(MESSAGE)
  }

  beforeEach(() => {
    global.console = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      trace: jest.fn()
    }

    whisp = new Whisp(NAME)
  })

  describe('`constructor`', () => {
    test('passing name through contructor should work', () => {
      expect(whisp.name).toBe(NAME)
    })

    test('default values should be set', () => {
      whisp = new Whisp()
      expect(whisp.name).toBe('')
      expect(whisp.level()).toBe('debug')
      expect(whisp.onWorkEnd).toBeInstanceOf(Function)
      expect(whisp.onWorkError).toBeInstanceOf(Function)
    })

    test('all logging methods should be defined', () => {
      expect(whisp.log).toBeDefined()
      expect(whisp.debug).toBeDefined()
      expect(whisp.warn).toBeDefined()
      expect(whisp.error).toBeDefined()
      expect(whisp.trace).toBeDefined()
    })

    test('passing level through constructor should work', () => {
      whisp = new Whisp(NAME, 'warn')
      log()
      expect(global.console.warn).toHaveBeenCalledWith(MESSAGE)
      expect(global.console.error).toHaveBeenCalledWith(MESSAGE)
    })
  })

  describe('`logging`', () => {
    test('by default logging level debug and above should only work', () => {
      log()
      expect(global.console.trace).toBeCalledTimes(0)
      expect(global.console.log).toBeCalledWith(MESSAGE)
      expect(global.console.info).toBeCalledWith(MESSAGE)
      expect(global.console.warn).toBeCalledWith(MESSAGE)
      expect(global.console.error).toBeCalledWith(MESSAGE)
    })

    test('setting level to trace should allow all logging methods to work', () => {
      whisp.level('trace')
      log()
      expect(global.console.trace).toBeCalledWith(MESSAGE)
      expect(global.console.log).toBeCalledWith(MESSAGE)
      expect(global.console.info).toBeCalledWith(MESSAGE)
      expect(global.console.warn).toBeCalledWith(MESSAGE)
      expect(global.console.error).toBeCalledWith(MESSAGE)
    })

    test('setting level to info should only output that level and up', () => {
      whisp.level('info')
      log()
      expect(global.console.trace).toBeCalledTimes(0)
      expect(global.console.log).toBeCalledTimes(0)
      expect(global.console.info).toBeCalledWith(MESSAGE)
      expect(global.console.warn).toBeCalledWith(MESSAGE)
      expect(global.console.error).toBeCalledWith(MESSAGE)
    })

    test('setting level to warn should only output that level and up', () => {
      whisp.level('warn')
      log()
      expect(global.console.trace).toBeCalledTimes(0)
      expect(global.console.log).toBeCalledTimes(0)
      expect(global.console.info).toBeCalledTimes(0)
      expect(global.console.warn).toBeCalledWith(MESSAGE)
      expect(global.console.error).toBeCalledWith(MESSAGE)
    })

    test('setting level to error should only output that level and up', () => {
      whisp.level('error')
      log()
      expect(global.console.trace).toBeCalledTimes(0)
      expect(global.console.log).toBeCalledTimes(0)
      expect(global.console.info).toBeCalledTimes(0)
      expect(global.console.warn).toBeCalledTimes(0)
      expect(global.console.error).toBeCalledWith(MESSAGE)
    })

    test('setting level to silent should disable all logging', () => {
      whisp.level('silent')
      log()
      expect(global.console.trace).toBeCalledTimes(0)
      expect(global.console.log).toBeCalledTimes(0)
      expect(global.console.info).toBeCalledTimes(0)
      expect(global.console.warn).toBeCalledTimes(0)
      expect(global.console.error).toBeCalledTimes(0)
    })

    test('getting and setting log level should work', () => {
      whisp.level('warn')
      expect(whisp.level()).toBe('warn')
    })

    test('logging methods should receive all arguments', () => {
      whisp.debug('message1', 'message2', 'message3')
      expect(global.console.log).toHaveBeenCalledWith('message1', 'message2', 'message3')
    })
  })

  describe('`templates`', () => {
    const TEMPLATE_NAME = 'template'
    const TEMPLATE_ID = 'template-' + TEMPLATE_NAME

    const template = jest.fn()

    beforeEach(() => {
      whisp.template(TEMPLATE_NAME, template)
    })

    afterEach(() => {
      template.mockClear()
    })

    test('getting and setting templates should work', () => {
      expect(whisp.template(TEMPLATE_NAME)).toBe(template)
    })

    test('passing template through logging method should call template with correct args', () => {
      whisp.debug(TEMPLATE_ID, MESSAGE)
      expect(template).toHaveBeenCalledWith('debug', MESSAGE)
    })

    test('template should receive correct level', () => {
      whisp.warn(TEMPLATE_ID, MESSAGE)
      expect(template).toHaveBeenCalledWith('warn', MESSAGE)
    })

    test('default templates should be used automatically', () => {
      const template = jest.fn()
      whisp.template('default', template)
      whisp.debug(MESSAGE)
      expect(template).toHaveBeenCalledWith('debug', MESSAGE)
    })

    test('template should receive all args', () => {
      whisp.debug(TEMPLATE_ID, MESSAGE, 'message2', 'message3')
      expect(template).toHaveBeenCalledWith('debug', MESSAGE, 'message2', 'message3')
    })

    test('template should modify output', () => {
      const template = (level, message) => `modified: ${message}`
      whisp.template(TEMPLATE_NAME, template).debug(TEMPLATE_ID, MESSAGE)
      expect(global.console.log).toHaveBeenCalledWith(`modified: ${MESSAGE}`)
    })

    test('template argument should be stripped out before logging to console', () => {
      const template = (level, message) => message
      whisp.template(TEMPLATE_NAME, template).debug(TEMPLATE_ID, MESSAGE)
      expect(global.console.log).toHaveBeenCalledWith(MESSAGE)
    })

    test('invalid template should have no effect', () => {
      whisp.debug('template-bad', MESSAGE)
      expect(global.console.log).toHaveBeenCalledWith('template-bad', MESSAGE)
    })

    test('templates should not be called when level is set to silent', () => {
      whisp.level('silent')
      whisp.debug(TEMPLATE_ID, MESSAGE)
      expect(template).toHaveBeenCalledTimes(0)
    })
  })

  describe('`workers`', () => {
    const FILE_WORKER = 'file-worker'
    const HTTP_WORKER = 'http-worker'

    const fileWorker = jest.fn()
    const httpWorker = jest.fn()

    beforeEach(() => {
      fileWorker.mockReturnValue(Promise.resolve(1))
      httpWorker.mockReturnValue(Promise.resolve(2))

      whisp.worker(FILE_WORKER, fileWorker)
        .worker(HTTP_WORKER, httpWorker)
    })

    afterEach(() => {
      fileWorker.mockClear()
      httpWorker.mockClear()
    })

    test('workers should be set', () => {
      expect(whisp.worker(FILE_WORKER)).toBe(fileWorker)
      expect(whisp.worker(HTTP_WORKER)).toBe(httpWorker)
    })

    test('workers should be called with correct args', () => {
      whisp.debug(MESSAGE)
      expect(fileWorker).toHaveBeenCalledWith('debug', MESSAGE)
      expect(httpWorker).toHaveBeenCalledWith('debug', MESSAGE)
    })

    test('workers should not be called when level is set to silent', () => {
      whisp.level('silent')
      whisp.debug(MESSAGE)
      expect(fileWorker).toHaveBeenCalledTimes(0)
      expect(httpWorker).toHaveBeenCalledTimes(0)
    })

    test('onWorkEnd should be called with the results when the workers finish', done => {
      whisp.onWorkEnd = jest.fn()
      whisp.debug(MESSAGE)
      setImmediate(() => {
        expect(whisp.onWorkEnd).toHaveBeenCalledWith([1, 2])
        done()
      })
    })

    test('onWorkError should be called with any worker rejections', done => {
      const error = new Error('something bad happened')
      fileWorker.mockReturnValue(Promise.reject(error))
      whisp.onWorkError = jest.fn()
      whisp.debug(MESSAGE)
      setImmediate(() => {
        expect(whisp.onWorkError).toHaveBeenCalledWith(error)
        done()
      })
    })
  })
})
