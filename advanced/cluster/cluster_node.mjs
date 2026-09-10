import cluster from "node:cluster";
import http from "node:http";
import os from "node:os";

const workers = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Starting ${workers} Node workers`);

  for (let i = 0; i < workers; i++) cluster.fork();
} else {
  http.createServer(function(req,res) {
    res.end("hello");
  }).listen(8989);

  console.log(`Worker ${process.pid} listening on port 8989`);
}