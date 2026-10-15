/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
export async function servlet() {
    await new Promise(resolve => setTimeout(resolve,100));
    return "Managed Promise completed by Achieve";
}

/*
ORIGINAL WORKBENCH COPY — restore/reference

export async function servlet() {
    await new Promise(resolve => setTimeout(resolve,100));
    return "Managed Promise completed by Achieve";
}
*/
