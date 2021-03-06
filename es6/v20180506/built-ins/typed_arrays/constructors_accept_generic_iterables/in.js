// built-ins / typed arrays / constructors accept generic iterables
module.exports = () => {
  $jscomp.initSymbolIterator();
  var constructors = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array'
  ];
  for(var i = 0; i < constructors.length; i++){
    var arr = new global[constructors[i]](__createIterableObject([1, 2, 3]));
    if(arr.length !== 3 || arr[0] !== 1 || arr[1] !== 2 || arr[2] !== 3)return false;
  }
  return true;

};