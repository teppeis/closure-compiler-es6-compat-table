var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  a != Array.prototype && a != Object.prototype && (a[c] = d.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, d, f) {
  if (c) {
    d = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
      var e = a[f];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    f = d[a];
    c = c(f);
    c != f && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, c) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var d = 0, f = {next:function() {
    if (d < a.length) {
      var e = d++;
      return {value:c(e, a[e]), done:!1};
    }
    f.next = function() {
      return {done:!0, value:void 0};
    };
    return f.next();
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
};
$jscomp.polyfill("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, d) {
      return [a, d];
    });
  };
}, "es6", "es3");
$jscomp.findInternal = function(a, c, d) {
  a instanceof String && (a = String(a));
  for (var f = a.length, e = 0; e < f; e++) {
    var h = a[e];
    if (c.call(d, h, e, a)) {
      return {i:e, v:h};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, d, f) {
    $jscomp.initSymbolIterator();
    d = null != d ? d : function(a) {
      return a;
    };
    var c = [], h = a[Symbol.iterator];
    if ("function" == typeof h) {
      for (a = h.call(a); !(h = a.next()).done;) {
        c.push(d.call(f, h.value));
      }
    } else {
      h = a.length;
      for (var k = 0; k < h; k++) {
        c.push(d.call(f, a[k]));
      }
    }
    return c;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, d) {
    return a === d ? 0 !== a || 1 / a === 1 / d : a !== a && d !== d;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, d) {
      return d;
    });
  };
}, "es8", "es3");
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function d(a) {
    return a instanceof e ? a : new e(function(c, g) {
      c(a);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  c.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var f = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    f(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var c = 0; c < a.length; ++c) {
        var g = a[c];
        delete a[c];
        try {
          g();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var e = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var c = this.createResolveAndReject_();
    try {
      a(c.resolve, c.reject);
    } catch (g) {
      c.reject(g);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        g || (g = !0, a.call(c, d));
      };
    }
    var c = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  e.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof e) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var c = null != a;
              break a;
            case "function":
              c = !0;
              break a;
            default:
              c = !1;
          }
        }
        c ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
  };
  e.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  e.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  e.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    this.executeOnSettledCallbacks_();
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, c = 0; c < a.length; ++c) {
        a[c].call(), a[c] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new c;
  e.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  e.prototype.settleSameAsThenable_ = function(a, c) {
    var g = this.createResolveAndReject_();
    try {
      a.call(c, g.resolve, g.reject);
    } catch (l) {
      g.reject(l);
    }
  };
  e.prototype.then = function(a, c) {
    function g(a, c) {
      return "function" == typeof a ? function(c) {
        try {
          d(a(c));
        } catch (p) {
          f(p);
        }
      } : c;
    }
    var d, f, n = new e(function(a, c) {
      d = a;
      f = c;
    });
    this.callWhenSettled_(g(a, d), g(c, f));
    return n;
  };
  e.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  e.prototype.callWhenSettled_ = function(a, c) {
    function g() {
      switch(d.state_) {
        case 1:
          a(d.result_);
          break;
        case 2:
          c(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(g) : this.onSettledCallbacks_.push(function() {
      h.asyncExecute(g);
    });
  };
  e.resolve = d;
  e.reject = function(a) {
    return new e(function(c, d) {
      d(a);
    });
  };
  e.race = function(a) {
    return new e(function(c, g) {
      for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next()) {
        d(f.value).callWhenSettled_(c, g);
      }
    });
  };
  e.all = function(a) {
    var c = $jscomp.makeIterator(a), g = c.next();
    return g.done ? d([]) : new e(function(a, e) {
      function f(c) {
        return function(d) {
          l[c] = d;
          m--;
          0 == m && a(l);
        };
      }
      var l = [], m = 0;
      do {
        l.push(void 0), m++, d(g.value).callWhenSettled_(f(l.length - 1), e), g = c.next();
      } while (!g.done);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.executeAsyncGenerator = function(a) {
  function c(c) {
    return a.next(c);
  }
  function d(c) {
    return a.throw(c);
  }
  return new Promise(function(f, e) {
    function h(a) {
      a.done ? f(a.value) : Promise.resolve(a.value).then(c, d).then(h, e);
    }
    h(a.next());
  });
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(d, f, e) {
      return d == a && "q" == f && e == c;
    }}));
    return !0 === c.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), d = Object.seal({}), e = new a([[c, 2], [d, 3]]);
      if (2 != e.get(c) || 3 != e.get(d)) {
        return !1;
      }
      e.delete(c);
      e.set(d, 4);
      return !e.has(c) && 4 == e.get(d);
    } catch (m) {
      return !1;
    }
  }
  function d(a) {
    $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value:{}});
  }
  function f(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      d(a);
      return c(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  var e = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var h = 0, k = function(a) {
    this.id_ = (h += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  k.prototype.set = function(a, c) {
    d(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = c;
    return this;
  };
  k.prototype.get = function(a) {
    return $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  k.prototype.has = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  k.prototype.delete = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return k;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), d = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != d.get(c) || 1 != d.size || d.get({x:4}) || d.set({x:4}, "t") != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), f = e.next();
      if (f.done || f.value[0] != c || "s" != f.value[1]) {
        return !1;
      }
      f = e.next();
      return f.done || 4 != f.value[0].x || "t" != f.value[1] || !e.next().done ? !1 : !0;
    } catch (q) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, f = function(a) {
    this.data_ = {};
    this.head_ = k();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  f.prototype.set = function(a, c) {
    var d = e(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = c : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = k();
    this.size = 0;
  };
  f.prototype.has = function(a) {
    return !!e(this, a).entry;
  };
  f.prototype.get = function(a) {
    return (a = e(this, a).entry) && a.value;
  };
  f.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  f.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  f.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  f.prototype.forEach = function(a, c) {
    for (var d = this.entries(), e; !(e = d.next()).done;) {
      e = e.value, a.call(c, e[1], e[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var e = function(a, c) {
    var e = c && typeof c;
    "object" == e || "function" == e ? d.has(c) ? e = d.get(c) : (e = "" + ++n, d.set(c, e)) : e = "p_" + c;
    var f = a.data_[e];
    if (f && $jscomp.owns(a.data_, e)) {
      for (a = 0; a < f.length; a++) {
        var g = f[a];
        if (c !== c && g.key !== g.key || c === g.key) {
          return {id:e, list:f, index:a, entry:g};
        }
      }
    }
    return {id:e, list:f, index:-1, entry:void 0};
  }, h = function(a, c) {
    var d = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != a.head_;) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:c(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, k = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, n = 0;
  return f;
}, "es6", "es3");
$jscomp.polyfill("Math.log1p", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (0.25 > a && -0.25 < a) {
      for (var c = a, f = 1, e = a, h = 0, k = 1; h != e;) {
        c *= a, k *= -1, e = (h = e) + k * c / ++f;
      }
      return e;
    }
    return Math.log(1 + a);
  };
}, "es6", "es3");
$jscomp.polyfill("Number.MAX_SAFE_INTEGER", function() {
  return 9007199254740991;
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function(a) {
  return a ? a : function(a) {
    return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a;
  };
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function(a) {
  return a ? a : function(a) {
    return Number.isFinite(a) ? a === Math.floor(a) : !1;
  };
}, "es6", "es3");
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(a, c) {
  for (var d = 1; d < arguments.length; d++) {
    var f = arguments[d];
    if (f) {
      for (var e in f) {
        $jscomp.owns(f, e) && (a[e] = f[e]);
      }
    }
  }
  return a;
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var c = [], f = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var e = 0; e < f.length; e++) {
      ("jscomp_symbol_" == f[e].substring(0, 14) ? a : c).push(f[e]);
    }
    return c.concat(a);
  };
}, "es6", "es5");
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, c = {};
  try {
    return c.__proto__ = a, c.a;
  } catch (d) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, c) {
  a.__proto__ = c;
  if (a.__proto__ !== c) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var c = function() {
  };
  c.prototype = a;
  return new c;
};
$jscomp.construct = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(a, f, e) {
      a = c(a, f);
      e && Reflect.setPrototypeOf(a, e.prototype);
      return a;
    };
  }
  return function(a, c, e) {
    void 0 === e && (e = a);
    e = $jscomp.objectCreate(e.prototype || Object.prototype);
    return Function.prototype.apply.call(a, e, c) || e;
  };
}();
$jscomp.polyfill("Reflect.getOwnPropertyDescriptor", function(a) {
  return a || Object.getOwnPropertyDescriptor;
}, "es6", "es5");
$jscomp.polyfill("Reflect.getPrototypeOf", function(a) {
  return a || Object.getPrototypeOf;
}, "es6", "es5");
$jscomp.findDescriptor = function(a, c) {
  for (; a;) {
    var d = Reflect.getOwnPropertyDescriptor(a, c);
    if (d) {
      return d;
    }
    a = Reflect.getPrototypeOf(a);
  }
};
$jscomp.polyfill("Reflect.isExtensible", function(a) {
  return a ? a : $jscomp.ASSUME_ES5 || "function" == typeof Object.isExtensible ? Object.isExtensible : function() {
    return !0;
  };
}, "es6", "es3");
$jscomp.checkStringArgs = function(a, c, d) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
  }
  if (c instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
  return a ? a : function(a) {
    var c = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > a || 1342177279 < a) {
      throw new RangeError("Invalid count value");
    }
    a |= 0;
    for (var f = ""; a;) {
      if (a & 1 && (f += c), a >>>= 1) {
        c += c;
      }
    }
    return f;
  };
}, "es6", "es3");
$jscomp.stringPadding = function(a, c) {
  a = void 0 !== a ? String(a) : " ";
  return 0 < c && a ? a.repeat(Math.ceil(c / a.length)).substring(0, c) : "";
};
$jscomp.arrayFromIterator = function(a) {
  for (var c, d = []; !(c = a.next()).done;) {
    d.push(c.value);
  }
  return d;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.inherits = function(a, c) {
  a.prototype = $jscomp.objectCreate(c.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var d = $jscomp.setPrototypeOf;
    d(a, c);
  } else {
    for (d in c) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var f = Object.getOwnPropertyDescriptor(c, d);
          f && Object.defineProperty(a, d, f);
        } else {
          a[d] = c[d];
        }
      }
    }
  }
  a.superClass_ = c.prototype;
};
module.exports = function() {
  return function(a) {
    return (void 0 === a ? function() {
      return "undefined" === typeof b;
    } : a)();
  }();
};

