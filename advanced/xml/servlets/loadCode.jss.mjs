/*
...servlets/loadCode.jss.mjs
This servlet reads source code used in examples and returns it to the web page.
*/

import fs from "node:fs";
import path from "node:path";

const files = {
  client: "../index.htm",
  startup: path.resolve(process.argv[1]),
  servlet: "sax.jss.mjs",
  codeServlet: "loadCode.jss.mjs"
};

export function servlet (session) {

  /*
    Achieve handles errors in synchronous servlets
	But you can, of course, add your own custom error handling if you wish
	More info in Basics: Achieve error handling example
  */
  
  const filename = files[session.params.file];
  const fullPath = path.isAbsolute(filename) ? filename : path.join(session.dirPath,filename);

  /*
    Synchronous servlets can simply return the response.
    default return type: text/plain, utf-8
    else use: session.response.setHeader.
  */
  return fs.readFileSync(fullPath,"utf8");
}
