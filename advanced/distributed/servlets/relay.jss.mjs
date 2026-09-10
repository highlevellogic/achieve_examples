// advanced/distributed/servlets/relay.jss.mjs

import http from "node:http";

export function servlet(session) {
  session.allowAsync = true;

  const headers = {
    "content-type": session.request.headers["content-type"] || "image/svg+xml"
  };

  if (session.request.headers["content-length"]) {
    headers["content-length"] = session.request.headers["content-length"];
  }

  // This server relays I/O; the worker owns the SVG-specific processing.
  const workerRequest = http.request({
    hostname: "localhost",
    port: 8990,
    path: "/advanced/distributed/worker/servlets/filterSvg.jss.mjs",
    method: "POST",
    headers
  },workerResponse => {
    session.response.statusCode = workerResponse.statusCode || 502;

    const contentType = workerResponse.headers["content-type"];
    if (contentType) session.response.setHeader("Content-Type",contentType);

    workerResponse.pipe(session.response);
  });

  workerRequest.on("error",error => {
    if (!session.response.headersSent) {
      session.response.statusCode = 502;
      session.response.setHeader("Content-Type","text/plain;charset=utf-8");
      session.response.end(`Worker request failed: ${error.message}`);
    } else if (!session.response.writableEnded) {
      session.response.destroy(error);
    }
  });

  session.request.on("aborted",() => workerRequest.destroy());
  session.response.on("close",() => {
    if (!session.response.writableEnded) workerRequest.destroy();
  });

  session.request.pipe(workerRequest);
}
