// subclassing / Array is subclassable / Array.prototype.concat
module.exports = () => {
  class C extends Array {}
  var c = new C();
  return c.concat(1) instanceof C;

};