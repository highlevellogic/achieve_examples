/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */

console.log("MODULE LOADED:", __filename, new Date().toISOString());

exports.servlet = function (session) {

  console.log("SERVLET CALLED:", __filename);

  var msg = "Hello World! from servlet hello. Using method: " + session.request.method;

  return msg;
}
