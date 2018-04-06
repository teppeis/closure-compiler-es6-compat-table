// functions / class / computed accessor properties
module.exports = function() {
  var garply = "foo", grault = "bar", baz = false;
  class C {
    get [garply]() { return "foo"; }
    set [grault](x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;

};