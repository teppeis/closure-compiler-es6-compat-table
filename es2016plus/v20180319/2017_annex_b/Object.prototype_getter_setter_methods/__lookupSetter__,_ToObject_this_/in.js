// 2017 annex b / Object.prototype getter/setter methods / __lookupSetter__, ToObject(this)
module.exports = () => {
  __lookupSetter__.call(1, 'key');
  try {
    __lookupSetter__.call(null, 'key');
  } catch(e){
    return true;
  }

};