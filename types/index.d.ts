export type Level = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'silent'

interface IWhisp {
  readonly name: string
  readonly level: string
  is(level: Level): void
  log(...args: any): void
  warn(...args: any): void
  info(...args: any): void
  error(...args: any): void
  debug(...args: any): void
  trace(...args: any): void
}

type WhispConstructor = new(
  name: string,
  level?: Level,
  runners?: ((name: string, level: Level, messages: any) => void)[],
  template?: (name: string, level: Level, messages: any[]) => string
) => IWhisp

declare const Whisp: WhispConstructor;

export default Whisp;

