// miscellaneous: duplicate property names in strict mode
module.exports = function() {
'use strict';
        return this === undefined && ({ a:1, a:1 }).a === 1;
      
};