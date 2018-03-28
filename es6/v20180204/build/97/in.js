// destructuring, assignment: throws on null and undefined
module.exports = function() {
var a,b;
        try {
          ({a} = null);
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        try {
          ({b} = undefined);
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        return true;
      
};