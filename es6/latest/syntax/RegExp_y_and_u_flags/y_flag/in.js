// syntax / RegExp "y" and "u" flags / "y" flag
module.exports = () => {
  var re = new RegExp('\\w', 'y');
  re.exec('xy');
  return (re.exec('xy')[0] === 'y');

};