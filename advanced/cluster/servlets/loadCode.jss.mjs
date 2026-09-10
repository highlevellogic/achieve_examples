// advanced/cluster/servlets/loadCode.jss.mjs

import fs from "node:fs";
import path from "node:path";

const files = {
  client: "../index.htm",
  startup: path.resolve(process.argv[1]),
  single: path.resolve(process.argv[1]),
  cluster: path.resolve(process.argv[1]),
  servlet: "primes.jss"
};

export function servlet(session) {
  const file = files[session.params.file];

  if (!file) return "Source file not found.";

  const fullPath = path.isAbsolute(file) ? file : path.join(session.dirPath,file);
  return fs.readFileSync(fullPath,"utf8");
}
