/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
let count = 0;

exports.servlet = function (context) {
    if (context.request.method === "POST") count++;
    return String(count);
}
