var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, b) {
  a != Array.prototype && a != Object.prototype && (a[e] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, e, b, c) {
  if (e) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var d = a[c];
      d in b || (b[d] = {});
      b = b[d];
    }
    a = a[a.length - 1];
    c = b[a];
    e = e(c);
    e != c && null != e && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("Array.prototype.flat", function(a) {
  return a ? a : function(a) {
    a = void 0 === a ? 1 : a;
    for (var b = [], c = 0; c < this.length; c++) {
      var d = this[c];
      Array.isArray(d) && 0 < a ? (d = Array.prototype.flat.call(d, a - 1), b.push.apply(b, d)) : b.push(d);
    }
    return b;
  };
}, "es9", "es5");
module.exports = function() {
  return "12345,6" === [1, [2, 3], [4, [5, 6]]].flat().join("");
};

