// syntax / destructuring, parameters / throws on null and undefined
module.exports = () => {
  try {
    (function({a}){}(null));
    return false;
  } catch(e) {}
  try {
    (function({b}){}(undefined));
    return false;
  } catch(e) {}
  return true;

};