// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.not
module.exports = function() {
  return simdBoolTypes.every(function(type){
    return typeof SIMD[type].not === 'function';
  });

};