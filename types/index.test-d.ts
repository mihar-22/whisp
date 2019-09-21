import Whisp from '.'

// Good: Constructor with name
const whisp = new Whisp('my app');

// Good: Construct with name and level
new Whisp('my-app', 'debug');

// Bad: Construct with too many arguments
// @ts-ignore
new Whisp('my-app', 'debug', 'extra');

// Bad: construct without any arguments
// @ts-ignore
new Whisp();

// Bad: construct with an invalid level argument
new Whisp('my-app', 'log');

// Good: Get name
const name: string = whisp.name;

// Good: Call all logs and chain
whisp.log('message')
  .trace('message1')
  .debug('message1', 'message2')
  .info('message1', 'message2')
  .warn('message1')
  .error('message1', 'message2', 'message3');

// Good: Get level
whisp.level();

// Good: Set Level
whisp.level('debug');

// Bad: Set invalid level
// @ts-ignore
whisp.level('log');

// Good: Set Worker
whisp.worker('worker1', (level, message) => Promise.);

// Good: Get Worker
whisp.worker('worker1');

// Bad: Get worker with invalid name
// @ts-ignore
whisp.worker(1);

// Good: Set Template
whisp.template('template1', (level) => '');

// Good: Get Template
whisp.template('template1');

// Good: Set onWorkEnd
whisp.onWorkEnd = (results) => {};

// Good: Set onWorkError
whisp.onWorkError = (reason) => {};
