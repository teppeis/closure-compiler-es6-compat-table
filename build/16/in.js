// const: temporal dead zone (strict mode)
module.exports = function() {

        'use strict';
        var passed = (function(){ try { qux; } catch(e) { return true; }}());
        const qux = 456;
        return passed;
      
};