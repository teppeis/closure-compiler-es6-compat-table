// bindings / const / for loop statement scope (strict mode)
module.exports = () => {
  'use strict';
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;

};