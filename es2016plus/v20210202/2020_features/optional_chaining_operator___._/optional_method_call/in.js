// 2020 features / optional chaining operator (?.) / optional method call
module.exports = () => {
var foo = { baz: function () { return this.value; }, value: 42 };
var bar = null;
return foo?.baz() === 42 && bar?.baz() === void undefined;

};