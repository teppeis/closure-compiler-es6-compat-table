var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbol();
  var b = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var c = 0, d = function(a) {
    if (this instanceof d) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (a || "") + "_" + c++, a);
  };
  return d;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0, d = {next:function() {
    if (c < a.length) {
      var e = c++;
      return {value:b(e, a[e]), done:!1};
    }
    d.next = function() {
      return {done:!0, value:void 0};
    };
    return d.next();
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return c;
    });
  };
}, "es8", "es3");
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) {
      return {i:e, v:f};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(a, c) {
    return $jscomp.findInternal(this, a, c).v;
  };
}, "es6", "es3");
module.exports = function() {
  return 1 === [1, 2, 3].values().find(function(a) {
    return a % 2;
  });
};

