// optimisation / proper tail calls (tail call optimisation) / mutual recursion
module.exports = () => {
  "use strict";
  function f(n){
    if (n <= 0) {
      return  "foo";
    }
    return g(n - 1);
  }
  function g(n){
    if (n <= 0) {
      return  "bar";
    }
    return f(n - 1);
  }
  return f(1e6) === "foo" && f(1e6+1) === "bar";

};