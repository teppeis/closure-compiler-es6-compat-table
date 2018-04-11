// built-in extensions / Number properties / Number.MIN_SAFE_INTEGER
module.exports = function() {
  // NOTE: this code seems not to cause polyfill insertion
  return Number.MIN_SAFE_INTEGER === -(Math.pow(2, 53) - 1);
};
