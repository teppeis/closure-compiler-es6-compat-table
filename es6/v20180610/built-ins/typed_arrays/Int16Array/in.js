// built-ins / typed arrays / Int16Array
module.exports = () => {
  var buffer = new ArrayBuffer(64);
  var view = new Int16Array(buffer);        view[0] = 0x8000;
  return view[0] === -0x8000;

};