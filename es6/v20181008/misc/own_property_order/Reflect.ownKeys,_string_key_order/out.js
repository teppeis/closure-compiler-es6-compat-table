var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
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
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var c = [], d = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var b = 0; b < d.length; b++) {
      ("jscomp_symbol_" == d[b].substring(0, 14) ? a : c).push(d[b]);
    }
    return c.concat(a);
  };
}, "es6", "es5");
module.exports = function() {
  var a = {2:!0, 0:!0, 1:!0, " ":!0, 9:!0, D:!0, B:!0, "-1":!0, A:!0, 3:!0};
  "EFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(b) {
    a[b] = !0;
  });
  Object.defineProperty(a, "C", {value:!0, enumerable:!0});
  Object.defineProperty(a, "4", {value:!0, enumerable:!0});
  delete a[2];
  a[2] = !0;
  return "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC" === Reflect.ownKeys(a).join("");
};

