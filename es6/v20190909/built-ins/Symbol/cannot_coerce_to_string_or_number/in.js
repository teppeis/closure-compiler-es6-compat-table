// built-ins / Symbol / cannot coerce to string or number
module.exports = () => {
  var symbol = Symbol();
  try {
    symbol + "";
    return false;
  }
  catch(e) {}
  try {
    symbol + 0;
    return false;
  } catch(e) {}
  return true;

};