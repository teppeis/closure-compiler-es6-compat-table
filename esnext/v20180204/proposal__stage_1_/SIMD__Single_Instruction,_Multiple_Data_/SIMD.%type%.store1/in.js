// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.store1
module.exports = function() {
  return simd32bitFloatIntTypes.every(function(type){
    return typeof SIMD[type].store1 === 'function';
  });

};