/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
export async function servlet(session) {
    const helper = await session.load("helper.jss.mjs");
    return helper.hello();
}

/*
ORIGINAL WORKBENCH COPY — restore/reference

export async function servlet(session) {
    const helper = await session.load("helper.jss.mjs");
    return helper.hello();
}
*/
