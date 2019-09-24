/**
 * Inspired by
 * https://github.com/MichaelCereda/pretty-cli/blob/master/src/templates/basic.js
 */

const Whisp = require('../../dist/whisp.cjs.min')
const colors = require('colors')

const ThemeBuilder = (background, foreground) => ({
  bg: background,
  fg: foreground
})

const Theme = {
  debug: ThemeBuilder('bgWhite', 'black'),
  info: ThemeBuilder('bgBlue', 'white'),
  warn: ThemeBuilder('bgYellow', 'black'),
  error: ThemeBuilder('bgRed', 'white'),
  trace: ThemeBuilder('bgMagenta', 'white')
}

const _ = {
  xPad: (text) => ` ${text} `,
  bold: (text) => `${text}`.bold
}

const Components = {
  badge: (theme, level) => {
    return colors[theme.bg][theme.fg](
      _.xPad(level[0].toUpperCase())
    ) + ' '
  }
}

const whisp = new Whisp('<example-2>')

whisp.template('default', (level, message) => {
  const theme = Theme[level]
  return Components.badge(theme, level) + _.bold(whisp.name) + ` ${message}\n`
})

whisp
  .debug('damn.')
  .info('hmm...')
  .warn('*!$#*$.')
  .error('........')
