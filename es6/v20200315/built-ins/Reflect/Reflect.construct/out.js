var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var c = function() {
  };
  c.prototype = a;
  return new c;
};
$jscomp.construct = function() {
  function a() {
    function b() {
    }
    new b;
    Reflect.construct(b, [], function() {
    });
    return new b instanceof b;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(b, a, e) {
      b = c(b, a);
      e && Reflect.setPrototypeOf(b, e.prototype);
      return b;
    };
  }
  return function(b, a, c) {
    void 0 === c && (c = b);
    c = $jscomp.objectCreate(c.prototype || Object.prototype);
    return Function.prototype.apply.call(b, c, a) || c;
  };
}();
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
module.exports = function() {
  return "foobarbaz" === Reflect.construct(function(a, c, b) {
    this.qux = a + c + b;
  }, ["foo", "bar", "baz"]).qux;
};

