// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / Int32x4
module.exports = () => {
  return typeof SIMD.Int32x4 === 'function';

};