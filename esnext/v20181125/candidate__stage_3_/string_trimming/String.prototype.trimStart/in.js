// candidate (stage 3) / string trimming / String.prototype.trimStart
module.exports = () => {
  return ' \t \n abc   \t\n'.trimStart() === 'abc   \t\n';

};