// built-ins / WeakMap / frozen objects as keys
module.exports = () => {
  var f = Object.freeze({});
  var m = new WeakMap;
  m.set(f, 42);
  return m.get(f) === 42;

};