// functions / class / computed static accessor properties
module.exports = function() {
  var garply = "foo", grault = "bar", baz = false;
  class C {
    static get [garply]() { return "foo"; }
    static set [grault](x) { baz = x; }
  }
  C.bar = true;
  return C.foo === "foo" && baz;

};