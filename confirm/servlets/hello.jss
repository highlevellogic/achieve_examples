/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
exports.servlet = function () {
    return `<span style='font-weight: bold;
        font-style: italic;
        color: green;
        font-size: 1.2em;'>
		Achieve is running and servlets are working.</span>`;
};