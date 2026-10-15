/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
exports.servlet = function (session) {
  session.response.statusCode = 201;
  session.response.setHeader("Content-Type", "text/plain; charset=utf-8");
  session.response.end("The servlet completed this response.");
};
