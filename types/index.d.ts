export type Level = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'silent'

type OnRunEndCallback = (results: any[]) => void | undefined;

interface IWhisp {
  readonly name: string
  readonly level: string
  onRunEnd: OnRunEndCallback,
  is(level: Level): void
  log(...args: any[]): void
  warn(...args: any[]): void
  info(...args: any[]): void
  error(...args: any[]): void
  debug(...args: any[]): void
  trace(...args: any[]): void
}

type WhispConstructor = new(
  name: string,
  level?: Level,
  runners?: ((name: string, level: Level, ...args: any[]) => Promise<any>)[],
  template?: (name: string, level: Level, ...args: any[]) => string,
  onRunEnd?: OnRunEndCallback
) => IWhisp

declare const Whisp: WhispConstructor;

export default Whisp;

