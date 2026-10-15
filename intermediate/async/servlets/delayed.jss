/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
exports.servlet = function (session) {
  session.autoEnd = false;
  setTimeout(function () { session.response.end("Completed asynchronously."); },250);
};
