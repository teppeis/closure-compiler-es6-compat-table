// functions / class / computed prototype methods
module.exports = () => {
  var foo = "method";
  class C {
    [foo]() { return 2; }
  }
  return typeof C.prototype.method === "function"
&& new C().method() === 2;

};