// built-ins / Proxy / "get" handler invariants
module.exports = () => {
  var passed = false;
  var proxied = { };
  var proxy = new Proxy(proxied, {
    get: function () {
      passed = true;
      return 4;
    }
  });
  // The value reported for a property must be the same as the value of the corresponding
  // target object property if the target object property is a non-writable,
  // non-configurable own data property.
  Object.defineProperty(proxied, "foo", { value: 5, enumerable: true });
  try {
    proxy.foo;
    return false;
  }
  catch(e) {}
  // The value reported for a property must be undefined if the corresponding target
  // object property is a non-configurable own accessor property that has undefined
  // as its [[Get]] attribute.
  Object.defineProperty(proxied, "bar",
    { set: function(){}, enumerable: true });
  try {
    proxy.bar;
    return false;
  }
  catch(e) {}
  return passed;

};