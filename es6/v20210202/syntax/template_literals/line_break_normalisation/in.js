// syntax / template literals / line break normalisation
module.exports = () => {
  // NOTE: Edit carefully! This code includes various line breaks (CR, LF and CRLF).
  var cr   = `xy`;
  var lf   = `x
y`;
  var crlf = `x
y`;

  return cr.length === 3 && lf.length === 3 && crlf.length === 3
    && cr[1] === lf[1] && lf[1] === crlf[1] && crlf[1] === '\n';
};
