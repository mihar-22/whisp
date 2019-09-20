import {terser} from "rollup-plugin-terser";

const plugins = [];

const minPlugins = plugins.concat([
  terser({
    mangle: {
      properties: /_$/
    },
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      typeofs: false,
    },
  }),
]);

const build = (format, isMin = false) => ({
  input: "./src/index.js",
  output: {
    name: (format === "umd") ? "Whisp" : null,
    file: [
      "./dist/whisp",
      (format === "umd") ? null : `.${format}`,
      isMin ? ".min" : null,
      ".js",
    ].filter(Boolean).join(""),
    format: (format === "esm") ? "es" : format,
    exports: (format === "esm") ? "named" : "auto",
  },
  plugins: isMin ? minPlugins : plugins,
});

export default [
  build("umd"),
  build("esm"),
  build("cjs"),
  build("umd", true),
  build("esm", true),
  build("cjs", true),
];
