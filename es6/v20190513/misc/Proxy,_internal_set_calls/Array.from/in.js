// misc / Proxy, internal 'set' calls / Array.from
module.exports = () => {
// Array.from -> Set -> [[Set]]
  var set = [];
  var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  Array.from.call(function(){ return p; }, {length:2, 0:1, 1:2});
  return set + '' === "length";

};