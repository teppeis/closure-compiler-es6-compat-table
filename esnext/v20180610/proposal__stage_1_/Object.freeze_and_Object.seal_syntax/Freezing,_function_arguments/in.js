// proposal (stage 1) / Object.freeze and Object.seal syntax / Freezing, function arguments
module.exports = () => {
function foo(# bar, baz #) {
if (baz === 42) bar = 27;
return bar + baz;
}
if (foo(1, 2) !== 3) return;
try {
foo(1, 42);
} catch (e) {
return true;
}

};