import {expectType,expectError} from "tsd";
import Whisp, {Level, IWhisp, Worker, Template} from '.'

// Constructor with name
const whisp = new Whisp('my app').level('trace');

// Construct with name and level
expectType<IWhisp>(new Whisp('my-app', 'debug'));

// Construct with too many arguments
expectError(new Whisp('my-app', 'debug', 'extra'));

// Construct without any arguments
expectError(new Whisp());

// Construct with an invalid level argument
expectError(new Whisp('my-app', 'log'));

// Get name
expectType<string>(whisp.name);

// Call all logging methods and chain
expectType<IWhisp>(whisp.trace('message'));
expectType<IWhisp>(whisp.log('message'));
expectType<IWhisp>(whisp.debug('message'));
expectType<IWhisp>(whisp.info('message'));
expectType<IWhisp>(whisp.warn('message'));
expectType<IWhisp>(whisp.error('message'));

// Get level
expectType<Level>(whisp.level());

// Set Level
expectType<IWhisp>(whisp.level('debug'));

// Set invalid level
expectError(whisp.level('log'));

// Set Worker
expectType<IWhisp>(whisp.worker('worker1', (level, message) => Promise.resolve(1)));

// Get Worker
expectType<Worker>(whisp.worker('worker1'));

// Get worker with invalid name
expectError(whisp.worker(1));

// Set Template
expectType<IWhisp>(whisp.template('template1', (level) => ''));

// Get Template
expectType<Template>(whisp.template('template1'));

// Set onWorkEnd
whisp.onWorkEnd = (results) => {};
whisp.onWorkEnd = (results) => Promise.resolve();

// Set onWorkEnd to invalid value
expectError(whisp.onWorkEnd = (results: any, values: any) => {});

// Set onWorkError
whisp.onWorkError = (reason) => {};
whisp.onWorkError = (results) => Promise.resolve();

// Set onWorkError to invalid value
expectError(whisp.onWorkError = (reason: any, values: any) => {});
