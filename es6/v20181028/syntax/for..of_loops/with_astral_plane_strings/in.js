// syntax / for..of loops / with astral plane strings
module.exports = () => {
  var str = "";
  for (var item of "𠮷𠮶")
    str += item + " ";
  return str === "𠮷 𠮶 ";

};