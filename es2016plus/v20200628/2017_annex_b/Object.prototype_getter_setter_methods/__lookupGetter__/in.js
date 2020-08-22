// 2017 annex b / Object.prototype getter/setter methods / __lookupGetter__
module.exports = () => {
  var obj = {
    get foo() { return "bar"},
    qux: 1
  };
  var foo = Object.prototype.__lookupGetter__.call(obj, "foo");
  return foo() === "bar"
&& Object.prototype.__lookupGetter__.call(obj, "qux") === void undefined
&& Object.prototype.__lookupGetter__.call(obj, "baz") === void undefined;

};