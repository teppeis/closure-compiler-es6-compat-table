// misc / Updated identifier syntax / var ⸯ;
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  try {
    eval('var ⸯ');
  } catch(e) {
    return true;
  }

};