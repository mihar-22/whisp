import Whisp from '.'

// Good
const whisp = new Whisp('', 'trace');
new Whisp('');

// Good
whisp.is('info');
whisp.is('debug');
whisp.is('error');
whisp.is('warn');
whisp.is('silent');
whisp.is('trace');

//Bad
// @ts-ignore
new Whisp();

// Bad
// @ts-ignore
whisp.setLevel('log');
