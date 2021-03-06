// subclassing / Promise is subclassable / Promise.all
module.exports = (asyncTestPassed) => {
  class P extends Promise {}
  var fulfills = P.all([
    new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
    new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); })
  ]);
  var rejects = P.all([
    new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
    new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); })
  ]);
  var score = +(fulfills instanceof P);
  fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
  rejects.catch(function(result) { score += (result === "qux"); check(); });
  function check() {
    if (score === 3) asyncTestPassed();
  }

};