// functions / super / is statically bound
module.exports = function() {
  class B {
    qux() { return "bar"; }
  }
  class C extends B {
    qux() { return super.qux() + this.corge; }
  }
  var obj = {
    qux: C.prototype.qux,
    corge: "ley"
  };
  return obj.qux() === "barley";

};