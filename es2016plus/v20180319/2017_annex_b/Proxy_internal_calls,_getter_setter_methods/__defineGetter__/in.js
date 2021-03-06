// 2017 annex b / Proxy internal calls, getter/setter methods / __defineGetter__
module.exports = () => {
// Object.prototype.__defineGetter__ -> DefinePropertyOrThrow -> [[DefineOwnProperty]]
  var def = [];
  var p = new Proxy({}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
  Object.prototype.__defineGetter__.call(p, "foo", Object);
  return def + '' === "foo";

};