module.exports = function() {
  var b = [], a = new Proxy({exec:function() {
    return null;
  }}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  RegExp.prototype.test.call(a);
  return "exec" === b + "";
};

