// super: constructor calls use correct "new.target" binding
module.exports = function() {
var passed;
        class B {
          constructor() { passed = (new.target === C); }
        }
        class C extends B {
          constructor() { super(); }
        }
        new C();
        return passed;
      
};