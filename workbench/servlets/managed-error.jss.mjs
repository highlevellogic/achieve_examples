/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
export async function servlet() {
    await new Promise(resolve => setTimeout(resolve,100));
    throw new Error("DELIBERATE MANAGED ASYNC WORKBENCH ERROR");
}

/*
ORIGINAL WORKBENCH COPY — restore/reference

export async function servlet() {
    await new Promise(resolve => setTimeout(resolve,100));
    throw new Error("DELIBERATE MANAGED ASYNC WORKBENCH ERROR");
}
*/
