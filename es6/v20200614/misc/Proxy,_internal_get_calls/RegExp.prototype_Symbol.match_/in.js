// misc / Proxy, internal 'get' calls / RegExp.prototype[Symbol.match]
module.exports = () => {
// RegExp.prototype[Symbol.match] -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.match].call(p);
  p.global = true;
  RegExp.prototype[Symbol.match].call(p);
  return get + '' === "global,exec,global,unicode,exec";

};