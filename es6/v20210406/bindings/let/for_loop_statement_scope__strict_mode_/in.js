// bindings / let / for loop statement scope (strict mode)
module.exports = () => {
  'use strict';
  let baz = 1;
  for(let baz = 0; false;) {}
  return baz === 1;

};