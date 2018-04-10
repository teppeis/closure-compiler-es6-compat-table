// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.notEqual
module.exports = function() {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].notEqual === 'function';
  });

};