// syntax / destructuring, parameters / new Function() support
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  return new Function("{a, x:b, y:e}","[c, d]",
    "return a === 1 && b === 2 && c === 3 && "
+ "d === 4 && e === void undefined;"
  )({a:1, x:2}, [3, 4]);

};