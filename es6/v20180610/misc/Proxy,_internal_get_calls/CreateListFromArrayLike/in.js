// misc / Proxy, internal 'get' calls / CreateListFromArrayLike
module.exports = () => {
// CreateListFromArrayLike -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({length:2, 0:0, 1:0}, { get: function(o, k) { get.push(k); return o[k]; }});
  Function.prototype.apply({}, p);
  return get + '' === "length,0,1";

};