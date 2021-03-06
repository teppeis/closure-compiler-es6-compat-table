// functions / generators / string-keyed shorthand generator methods
module.exports = () => {
  var o = {
    * "foo bar"() {
      yield 5; yield 6;
    },
  };
  var iterator = o["foo bar"]();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;

};