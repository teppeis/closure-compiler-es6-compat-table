// misc / Proxy, internal 'get' calls / String.prototype.match
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  // String.prototype.match -> Get -> [[Get]]
  var get = [];
  var proxied = {};
  proxied[Symbol.toPrimitive] = Function();
  var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
  "".match(p);
  return get[0] === Symbol.match && get[1] === Symbol.toPrimitive && get.length === 2;

};