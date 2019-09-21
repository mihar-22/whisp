export type Level = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'silent'
export type OnWorkEnd = (results: any[]) => void;
export type OnWorkError = (reason: any) => void;
export type Worker = (level: Level, ...args: any[]) => Promise<any>
export type Template = (level: Level, ...args: any[]) => string

interface IWhisp {
  [key: string]: any
  readonly name: string
  onWorkEnd: OnWorkEnd
  onWorkError: OnWorkError
  level(): Level
  level(level: Level): IWhisp
  worker(name: string): Worker
  worker(name: string, worker: Worker): IWhisp
  template(name: string): Template
  template(name: string, template: Template): IWhisp
  log(...args: any[]): IWhisp
  warn(...args: any[]): IWhisp
  info(...args: any[]): IWhisp
  error(...args: any[]): IWhisp
  debug(...args: any[]): IWhisp
  trace(...args: any[]): IWhisp
}

type WhispConstructor = new(name: string, level?: string) => IWhisp

declare const Whisp: WhispConstructor;

export default Whisp;

