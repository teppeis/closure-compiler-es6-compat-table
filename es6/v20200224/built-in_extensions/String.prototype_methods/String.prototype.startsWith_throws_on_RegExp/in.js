// built-in extensions / String.prototype methods / String.prototype.startsWith throws on RegExp
module.exports = () => {
  try {
    'a'.startsWith(/./);
  } catch(e) {
    return 'foobar'.startsWith('foo');
  }
};
