// candidate (stage 3) / Function.prototype.toString revision / functions created with the Function constructor
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var fn = Function('a', ' /\x2A a \x2A/ b, c /\x2A b \x2A/ //', '/\x2A c \x2A/ ; /\x2A d \x2A/ //');
  var str = 'function anonymous(a, /\x2A a \x2A/ b, c /\x2A b \x2A/ //\n) {\n/\x2A c \x2A/ ; /\x2A d \x2A/ //\n}';
  return fn + '' === str;

};