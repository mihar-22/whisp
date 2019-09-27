// Type definitions for Whisp
// Project: https://github.com/mihar-22/whisp
// Definitions by: Rahim Alwer <https://github.com/mihar-22>

declare class Whisp {
  [key: string]: any
  readonly name: string;
  onWorkEnd: Whisp.OnWorkEnd;
  onWorkError: Whisp.OnWorkError;

  constructor(name: string, level?: Whisp.Level)

  level(level: Whisp.Level): Whisp
  level(): Whisp.Level
  worker(name: string, worker: Whisp.Worker): Whisp
  worker(name: string): Whisp.Worker
  template(name: string, template: Whisp.Template): Whisp
  template(name: string): Whisp.Template
  log(...args: any[]): Whisp
  warn(...args: any[]): Whisp
  info(...args: any[]): Whisp
  error(...args: any[]): Whisp
  debug(...args: any[]): Whisp
  trace(...args: any[]): Whisp
}

declare namespace Whisp {
  type Level = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'silent'
  type OnWorkEnd = (results: any[]) => void | Promise<void>;
  type OnWorkError = (reason: any) => void | Promise<void>;
  type Worker = (level: Level, ...args: any[]) => Promise<any>
  type Template = (level: Level, ...args: any[]) => string
}

export as namespace Whisp;
export default Whisp;


