// 2017 features / async functions / async arrow functions
module.exports = (asyncTestPassed) => {
  var a = async () => await Promise.resolve("foo");
  var p = a();
  if (!(p instanceof Promise)) {
    return false;
  }
  p.then(function(result) {
    if (result === "foo") {
      asyncTestPassed();
    }
  });

};