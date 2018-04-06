// built-ins / typed arrays / %TypedArray%.prototype.copyWithin
module.exports = function() {
  return typeof Int8Array.prototype.copyWithin === "function" &&
typeof Uint8Array.prototype.copyWithin === "function" &&
typeof Uint8ClampedArray.prototype.copyWithin === "function" &&
typeof Int16Array.prototype.copyWithin === "function" &&
typeof Uint16Array.prototype.copyWithin === "function" &&
typeof Int32Array.prototype.copyWithin === "function" &&
typeof Uint32Array.prototype.copyWithin === "function" &&
typeof Float32Array.prototype.copyWithin === "function" &&
typeof Float64Array.prototype.copyWithin === "function";

};