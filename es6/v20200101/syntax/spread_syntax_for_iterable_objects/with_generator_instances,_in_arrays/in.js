// syntax / spread syntax for iterable objects / with generator instances, in arrays
module.exports = () => {
  var iterable = (function*(){ yield "b"; yield "c"; yield "d"; }());
  return ["a", ...iterable, "e"][3] === "d";

};