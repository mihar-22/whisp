import { terser } from 'rollup-plugin-terser'

const plugins = []

const minPlugins = plugins.concat([
  terser({
    mangle: {
      properties: {
        reserved: [
          'name', 'level', 'worker',
          'template', 'onWorkEnd', 'onWorkError', 'template-default'
        ]
      }
    },
    compress: true
  })
])

const build = (format, isMin = false) => ({
  input: './src/index.js',
  output: {
    name: (format === 'umd') ? 'Whisp' : null,
    file: [
      './dist/whisp',
      (format === 'umd') ? null : `.${format}`,
      isMin ? '.min' : null,
      '.js'
    ].filter(Boolean).join(''),
    format: (format === 'esm') ? 'es' : format,
    exports: (format === 'esm') ? 'named' : 'auto'
  },
  plugins: isMin ? minPlugins : plugins
})

export default [
  build('umd'),
  build('esm'),
  build('cjs'),
  build('umd', true),
  build('esm', true),
  build('cjs', true)
]
