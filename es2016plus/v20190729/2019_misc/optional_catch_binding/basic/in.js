// 2019 misc / optional catch binding / basic
module.exports = () => {
try {
throw new Error();
}
catch {
return true;
}
return false;

};