// misc / Proxy, internal 'defineProperty' calls / SetIntegrityLevel
module.exports = () => {
// SetIntegrityLevel -> DefinePropertyOrThrow -> [[DefineOwnProperty]]
  var def = [];
  var p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
  Object.freeze(p);
  return def + '' === "foo,bar";

};