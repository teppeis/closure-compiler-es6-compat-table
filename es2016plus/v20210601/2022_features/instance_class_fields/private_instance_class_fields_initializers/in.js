// 2022 features / instance class fields / private instance class fields initializers
module.exports = () => {
class C {
#x = 42;
x(){
return this.#x;
}
}
return new C().x() === 42;

};