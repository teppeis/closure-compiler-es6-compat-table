// bindings / const / redefining a const (strict mode)
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  'use strict';
  const baz = 1;
  try {
    Function("'use strict'; const foo = 1; foo = 2;")();
  } catch(e) {
    return true;
  }

};