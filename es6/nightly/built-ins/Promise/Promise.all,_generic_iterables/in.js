// built-ins / Promise / Promise.all, generic iterables
module.exports = (asyncTestPassed) => {
  module.exports._ = Symbol.iterator;
  var fulfills = Promise.all(global.__createIterableObject([
    new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
    new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); })
  ]));
  var rejects = Promise.all(global.__createIterableObject([
    new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
    new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); })
  ]));
  var score = 0;
  fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
  rejects.catch(function(result) { score += (result === "qux"); check(); });
  function check() {
    if (score === 2) asyncTestPassed();
  }

};