// functions / super / statement in constructors
module.exports = () => {
  var passed = false;
  class B {
    constructor(a) { passed = (a === "barbaz"); }
  }
  class C extends B {
    constructor(a) { super("bar" + a); }
  }
  new C("baz");
  return passed;

};