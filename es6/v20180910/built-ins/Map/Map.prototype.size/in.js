// built-ins / Map / Map.prototype.size
module.exports = () => {
  var key = {};
  var map = new Map();
  map.set(key, 123);
  return map.size === 1;

};