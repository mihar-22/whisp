export type Level = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'silent'

interface ILogger {
  readonly name: string
  readonly level: string
  setLevel(level: Level): void
  log(...args: any): void
  warn(...args: any): void
  info(...args: any): void
  error(...args: any): void
  debug(...args: any): void
  trace(...args: any): void
}

type LoggerConstructor = new(
  name: string,
  level?: Level,
  runners?: ((name: string, level: Level, messages: any) => void)[],
  template?: (name: string, level: Level, messages: any[]) => string
) => ILogger

declare const Logger: LoggerConstructor;

export default Logger;

