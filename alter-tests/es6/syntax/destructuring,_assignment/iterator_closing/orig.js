// syntax / destructuring, assignment / iterator closing
module.exports = function() {
  $jscomp.initSymbolIterator();
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  var a,b;
  [a, b] = iter;
  return closed;

};