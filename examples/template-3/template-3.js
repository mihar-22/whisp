/**
 * Inspired by
 * https://github.com/MichaelCereda/pretty-cli/blob/master/src/templates/advanced.js
 */

const Whisp = require('../../dist/whisp.js')
const colors = require('colors/safe')

const ThemeBuilder = (primary, background, foreground) => ({
  primary,
  bg: background,
  fg: foreground
})

const Theme = {
  info: ThemeBuilder('blue', 'bgBlue', 'black'),
  error: ThemeBuilder('red', 'bgRed', 'white'),
  debug: ThemeBuilder('white', 'bgWhite', 'black'),
  warn: ThemeBuilder('yellow', 'bgYellow', 'black'),
  trace: ThemeBuilder('magenta', 'bgMagenta', 'white')
}

const _ = {
  xPad: (text) => ` ${text} `
}

const Components = {
  badge: (theme, title) => colors[theme.bg][theme.fg](
    _.xPad(title)
  ),
  message: (theme, text) => colors[theme.primary](text)
}

const whisp = new Whisp('<example-3>')

whisp
  .template('heading', (level, { title, message }) => {
    const theme = Theme[level]

    return [
      Components.badge(theme, title),
      Components.message(theme, message),
      '\n'
    ].join(' ')
  })
  .template('stats', (level, { time, errors, warnings }) => {
    const theme = Theme[level]

    return [
      Components.badge(theme, 'STATS'),
      Components.message(
        theme,
    `time: ${time} | errors: ${errors} | warnings: ${warnings}`
      ),
      '\n'
    ].join(' ')
  })
  .template('body', (level, { title, content }) => {
    const theme = Theme[level]

    return [
      Components.badge(theme, level[0].toUpperCase()),
      ' ',
      title,
      '\n\n',
      ...content.map((line) => line + '\n')
    ].join('')
  })
  .template('syntax', (level, { message, syntax, file, line }) => `SyntaxError: ${message} at ` +
    `${syntax} (${file}:${line})`)

const getTimestamp = (new Date().toTimeString().split(' ')[0])

whisp
  .error('template-heading', { title: 'BUILD', message: 'complete with errors' })
  .error('template-stats', { time: 30 + ' ms', errors: 12, warnings: 3 })
  .error('template-heading', { title: 'MODULE', message: '../files/test.js' })
  .error('template-body', {
    title: 'Test',
    content: [
    `[${getTimestamp}] Failed to load external module @module/moduleA`,
    `[${getTimestamp}] Failed to load external module @module/moduleB`
    ]
  })
  .error('template-syntax', {
    message: 'Unexpected reserved word',
    syntax: 'exports.runInThisContext',
    file: 'vm.js',
    line: '53:16'
  })
