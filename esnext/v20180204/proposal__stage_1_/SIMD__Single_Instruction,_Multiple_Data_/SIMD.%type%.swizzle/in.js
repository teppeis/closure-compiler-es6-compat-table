// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.swizzle
module.exports = () => {
  return simdFloatIntTypes.every(function(type){
    return typeof SIMD[type].swizzle === 'function';
  });

};