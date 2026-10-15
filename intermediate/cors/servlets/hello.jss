/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */

exports.servlet = function (session) {

  let msg = "Hello from servlet! CORS policy.";

  return msg;
}
