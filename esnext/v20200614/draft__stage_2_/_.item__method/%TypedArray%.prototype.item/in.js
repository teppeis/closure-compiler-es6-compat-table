// draft (stage 2) / `.item` method / %TypedArray%.prototype.item
module.exports = () => {
  return [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array'
  ].every(function (TypedArray) {
    var Constructor = globalThis[TypedArray];
    if (typeof Constructor !== 'function') {
      return true;
    }
    var arr = new Constructor([1, 2, 3]);
    return arr.item(0) === 1
&& arr.item(-3) === 1
&& arr.item(1) === 2
&& arr.item(-2) === 2
&& arr.item(2) === 3
&& arr.item(-1) === 3
&& arr.item(3) === undefined
&& arr.item(-4) === undefined;
  });

};