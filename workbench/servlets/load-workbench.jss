/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
exports.servlet = function (session) {
    const helper = session.load("helper.js");
    return helper.hello();
};

/*
ORIGINAL WORKBENCH COPY — restore/reference

exports.servlet = function (session) {
    const helper = session.load("helper.js");
    return helper.hello();
};
*/
