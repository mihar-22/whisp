/**
 * Inspired by
 * https://github.com/shellscape/webpack-log
 */

const Whisp = require('../../dist/whisp.js')

const ColorCode = {
  bold: [1, 22],
  blue: [34, 39],
  cyan: [36, 39],
  red: [31, 39],
  yellow: [33, 39],
  magenta: [35, 39]
}

const Theme = {
  trace: ColorCode.magenta,
  debug: ColorCode.cyan,
  info: ColorCode.blue,
  warn: ColorCode.yellow,
  error: ColorCode.red
}

const _ = {
  paint: (text, code) => `\u001b[${code[0]}m${text}\u001b[${code[1]}m`,
  bold: function (text) {
    return this.paint(text, ColorCode.bold)
  }
}

const whisp = new Whisp('<example-1>')

whisp.template('default', (level, message) => {
  const theme = Theme[level]
  const time = new Date().toTimeString().split(' ')[0]
  const symbol = (level === 'error' || level === 'warn') ? '⬢' : '⬡'

  return [
    _.paint(`[${time}] `, theme),
    _.paint(`${_.bold(symbol)} ${_.bold(whisp.name)} `, theme),
    message
  ].join('')
})

whisp
  .debug('damn.')
  .info('hmm...')
  .warn('*!$#*$.')
  .error('........')
